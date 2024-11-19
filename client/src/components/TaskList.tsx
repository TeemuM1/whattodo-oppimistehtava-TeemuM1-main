import { Task, TaskStatusEnum } from "../models/TaskModels";

interface TaskListProps {
  taskList: Task[];
  onDeleteTask: (name: string) => void;
  onEditTask: (task: Task) => void;
  onCreateTask: (task: Task) => void;
}

const TasksList = ({ taskList, onDeleteTask, onEditTask }: TaskListProps) => {
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
  return (
    <div className="w-full max-w-3xl mx-auto">
      <ul className="space-y-4">
        {taskList.map((task) => (
          <li
            key={task.name}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-base-200 p-6 rounded-lg shadow-md"
          >
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-6">
              <div>
                <h3 className="font-semibold text-xl text-gray-800">
                  {task.name}
                </h3>
                <p className="text-gray-600">{task.content}</p>
              </div>
              <span
                className={`${getBadgeClass(
                  task.status
                )} text-sm md:text-base py-2 px-4 rounded`}
              >
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
            <button
                onClick={() => onEditTask(task)} 
                className="btn btn-secondary btn-sm"
              >
                Edit
              </button>
              <button className="btn btn-error btn-sm mt-4 md:mt-0"
                onClick={() => {
                  console.log("Deleting task with name:", task.name);  
                  onDeleteTask(task.name);
                }}
              >
               Delete
              </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;