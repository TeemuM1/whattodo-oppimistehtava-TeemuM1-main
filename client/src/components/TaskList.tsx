import { useState } from "react";
import { Task, TaskStatusEnum } from "../models/TaskModels";

interface TaskListProps {
  taskList: Task[];
  onDeleteTask: (name: string) => void;
  onEditTask: (task: Task) => void;
}

const TasksList = ({ taskList, onDeleteTask, onEditTask }: TaskListProps) => {
  const tasksPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(taskList.length / tasksPerPage);

  const currentTasks = taskList.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const getBadgeClass = (status: TaskStatusEnum): string => {
    switch (status) {
      case TaskStatusEnum.NEW:
        return "badge badge-info";
      case TaskStatusEnum.INPROGRESS:
        return "badge badge-warning";
      case TaskStatusEnum.DONE:
        return "badge badge-success";
      default:
        return "badge badge-neutral";
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTasks.map((task) => (
          <div
            key={task.name}
            className="card bg-base-100 shadow-lg p-6 rounded-2xl flex flex-col justify-between h-full"
          >
            <div className="mb-4 flex justify-start">
              <span
                className={`${getBadgeClass(
                  task.status
                )} text-xs uppercase py-1 px-2 rounded-full`}
              >
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
                {task.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {task.startDate && new Date(task.startDate).toLocaleDateString()} -{" "}
                {task.endDate && new Date(task.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <p className="text-center text-gray-700 text-lg">
                {task.content}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => onEditTask(task)}
                className="btn btn-secondary btn-block mb-3"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTask(task.name)}
                className="btn btn-error btn-block"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          className="btn btn-outline btn-sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline btn-sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TasksList;