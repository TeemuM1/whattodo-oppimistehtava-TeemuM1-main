import { Task } from "../models/TaskModels";

interface TaskListProps {
  taskList: Task[];
  onDeleteTask: (taskToDelete: string) => void;
}

const TasksList = ({ taskList, onDeleteTask }: TaskListProps) => {
  return (
    <>
      <ul>
        {taskList.map((task: Task, index: number) => (
          <li
            key={index}
            className="flex justify-between items-center bg-base-200 p-4 mb-2 rounded"
          >
            <span>{task.name}</span>
            <span>{task.content}</span>
            <button
              className="btn btn-error"
              onClick={() => onDeleteTask(task.name)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksList;