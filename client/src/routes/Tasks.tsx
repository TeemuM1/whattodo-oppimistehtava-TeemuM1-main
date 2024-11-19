import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { getTasks, deleteTask, createTask, editTask } from "../services/apiService";
import { Task } from "../models/TaskModels";
import Notification from '../components/Notification';
import TaskModal from '../components/taskModal';

export default function Tasks() {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit">("create");
    const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await getTasks();
                setTaskList(data);
            } catch (error: unknown) {
              if (error instanceof Error) {
                setError(error.message);
              }
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, []);

    const handleOpenCreateModal = () => {
        setEditingTask(null);
        setModalMode("create");
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (task: Task) => {
        setEditingTask(task);
        setModalMode("edit");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitTask = async (task: Task) => {
        try {
            if (modalMode === "create") {
                const newTask = await createTask(task);
                setTaskList((prev) => [...prev, newTask]);
                setNotification({ message: "Task created successfully!", type: "success" });
            } else if (modalMode === "edit") {
                const updatedTask = await editTask(editingTask?.name || "", task);
                setTaskList((prev) =>
                    prev.map((t) => (t.name === editingTask?.name ? updatedTask : t))
                );
                setNotification({ message: "Task updated successfully!", type: "success" });
            }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setNotification({ message: error.message, type: "error"});
          } else {
            setNotification({ message: "An unknown error occurred.", type: "error"});
          }
          } finally {
            setIsModalOpen(false);
        }
    };

    const handleDeleteTask = async (taskName: string) => {
        try {
            await deleteTask(taskName);
            setTaskList((prev) => prev.filter((task) => task.name !== taskName));
            setNotification({ message: "Task deleted successfully!", type: "success" });
        } catch (error: unknown) {
          if (error instanceof Error) {
            setNotification({ message: error.message, type: "error" });
        } else {
            setNotification({ message: "Failed to delete task.", type: "error" });
        }
    }
};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-4xl font-bold text-gray-800 mb-6">Tasks</h2>
                    <div className="flex justify-between mb-6">
                        <button onClick={handleOpenCreateModal} className="btn btn-primary">
                            + Create Task
                        </button>
                        {notification && (
                            <Notification
                                message={notification.message}
                                type={notification.type}
                                onClose={() => setNotification(null)}
                            />
                        )}
                    </div>
                    {error && (
                        <div className="alert alert-error shadow-lg mb-4">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current flex-shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                                    />
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <TaskList
                                taskList={taskList}
                                onDeleteTask={handleDeleteTask}
                                onEditTask={handleOpenEditModal}
                                onCreateTask={handleSubmitTask}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmitTask}
                initialData={editingTask || {}}
                mode={modalMode}
            />
        </div>
    );
}



// import TaskList from "../components/TaskList";
// import { useState, useEffect } from "react";
// import { getTasks, deleteTask, createTask, editTask } from "../services/apiService";
// import { Task } from "../models/TaskModels";
// import Notification from '../components/Notification';
// import TaskModal from '../components/taskModal';

// export default function Tasks() {
//     const [taskList, setTaskList] = useState<Task[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [modalMode, setModalMode] = useState<"create" | "edit">("create");
//     const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);
    
//     useEffect(() => {
//         getTasks()
//             .then((data) => {
//                 setTaskList(data);
//             })
//             .catch((error) => {
//                 setError(error.message);
//             })
//             .finally(() => {
//               setLoading(false);
//             });
//     }, []);

//     const handleOpenCreateModal = () => {
//         setEditingTask(null);
//         setModalMode("create");
//         setIsModalOpen(true);
//     };

//     const handleOpenEditModal = (task: Task) => {
//         setEditingTask(task);
//         setModalMode("edit");
//         setIsModalOpen(true);
//     };
    
//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleSubmitTask = async (task: Task) => {
//       try {
//         if (modalMode === "create") {
//           const newTask = await createTask(task); // Create task API call
//           setTaskList((prev) => [...prev, newTask]); // Update list
//         } else if (modalMode === "edit") {
//           const updatedTask = await editTask(editingTask?.name || "", task); // Update API call
//           setTaskList((prev) =>
//             prev.map((t) => (t.name === editingTask?.name ? updatedTask : t))
//           ); // Update list
//         }
//         setIsModalOpen(false); // Close modal
//       } catch (error) {
//         console.error("Error saving task:", error);
//       }
//     };



//     async function handleDeleteTask(taskName: string) {
//         try {
//             await deleteTask(taskName);
//             setNotification({ message: "Task deleted successfully!", type: "success" });
//             const updatedTasks = await getTasks();
//             setTaskList(updatedTasks);
//         } catch (error) {
//             console.error("Error deleting task:", error);
//             setNotification({ message: "Failed to delete task.", type: "error" });
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6">Tasks</h2>
//           <div className="flex mb-4">
//             <button onClick={handleOpenCreateModal} className="btn btn-primary">
//               Create Task
//             </button>
//           </div>
//           {notification && (
//             <Notification
//               message={notification.message}
//               type={notification.type}
//               onClose={() => setNotification(null)}
//             />
//           )}
//           {error && (
//             <div className="alert alert-error shadow-lg mb-4 w-full max-w-md">
//               <div>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="stroke-current flex-shrink-0 h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
//                   />
//                 </svg>
//                 <span>{error}</span>
//               </div>
//             </div>
//           )}
//           {loading ? (
//             <div>Loading...</div>
//           ) : (
//             <TaskList
//               taskList={taskList}
//               onDeleteTask={handleDeleteTask}
//               onEditTask={handleOpenEditModal}  
//               onCreateTask={handleSubmitTask}
//             />
//           )}
//           <TaskModal
//             isOpen={isModalOpen}
//             onClose={handleCloseModal}
//             onSubmit={handleSubmitTask}
//             initialData={editingTask || {}}
//             mode={modalMode}
//           />
//         </div>
//       );
//     }
