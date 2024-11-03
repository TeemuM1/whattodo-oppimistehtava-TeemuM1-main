import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { getTasks } from "../services/apiService";

export default function Tasks() {
    const [taskList, setTaskList] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTasks()
            .then((data) => {
                setTaskList(data.tasks);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
              setLoading(false);
            });
    }, []);

    function handleDeleteTask(taskToDelete: string) {
        const newTasks = taskList.filter((task) => task !== taskToDelete);
        setTaskList(newTasks);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.target.value);
        setError(null); 
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask) {
            setError("Task cannot be empty"); 
            return;
        }
        setTaskList([...taskList, newTask]);
        setNewTask("");
        setError(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tasks</h2>

            
            {error && (
                <div className="alert alert-error shadow-lg mb-4 w-full max-w-md">
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
                <p className="text-gray-500">Loading...</p>
            ) : (
                <>
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center w-full max-w-md mb-4 space-x-2"
                    >
                        <input
                            type="text"
                            value={newTask}
                            onChange={handleChange}
                            placeholder="New task"
                            className="input input-bordered flex-grow"
                        />
                        <button type="submit" className="btn btn-primary">
                            Add Task
                        </button>
                    </form>

                    
                    <div className="w-full max-w-md">
                        <TaskList taskList={taskList} onDeleteTask={handleDeleteTask} />
                    </div>
                </>
            )}
        </div>
    );
}
