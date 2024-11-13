import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { getTasks } from "../services/apiService";
import { Task } from "../models/TaskModels";
import CreateTask from '../components/CreateTask';

export default function Tasks() {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        getTasks()
            .then((data) => {
                setTaskList(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
              setLoading(false);
            });
    }, []);

    function handleDeleteTask(taskToDelete: string) {
        const newTasks = taskList.filter((task) => task.name !== taskToDelete);
        setTaskList(newTasks);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Tasks</h2>
            <div className="flex mb-4">
                <CreateTask />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <TaskList taskList={taskList} onDeleteTask={handleDeleteTask} />
            )}
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
        </div>
    );
}
