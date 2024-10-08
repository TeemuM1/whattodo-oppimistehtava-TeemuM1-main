import { SetStateAction, useState } from 'react';

interface TaskListProps {
  taskList: string[];
  onDeleteTask: (task: string) => void;
  onAddTask: (task: string) => void;
}

export default function TaskList({taskList, onDeleteTask, onAddTask}: TaskListProps) {
        const [newTask, setNewTask] = useState<string>('');

        const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNewTask(e.target.value);
        };

        function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!newTask) return;
        onAddTask(newTask);
        setNewTask('');
        };

    return(
      <>
      <form className="addTask">
          <input
            value={newTask}
            placeholder="New task"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Add new task
          </button>
        </form>
        <div >
        <ul>
          {taskList.map((task, index) => (
            <li key={index}>{task}
            <button onClick={() => onDeleteTask(task)}>
              Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      </>
    );
}