import { SetStateAction, useState } from 'react';

const App = () => {
  const [taskList, setTaskList] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  
  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setNewTask(e.target.value);
  };

  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTask) return;
    setTaskList([...taskList, newTask]);
    setNewTask('');
  }

  function handleDelete(index: number){
    const newTasks = [...taskList];
    newTasks.splice(index, 1);
    setTaskList(newTasks);
  }

  return (
    <>
      <div className="header">
        <h1>WhatToDo</h1>
      </div>
      <div className="container">
        <form>
          <input
            value={newTask}
            placeholder="New task"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Add new task
          </button>
        </form>
        <ul>
          {taskList.map((task, index) => (
            <li key={index}>{task}
            <button onClick={() => handleDelete(index)}>
              Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;

/* Erillaisia tyylejä määritellä React komponentteja / funktioita
  function App() {}
  const App = () => {}
  export default function App() {}
*/
