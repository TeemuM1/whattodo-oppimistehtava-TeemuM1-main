import TaskList from "../components/TaskList";
import { useState } from "react";


export default function Tasks(){
    const [taskList, setTaskList] = useState<string[]>([])

      const handleAddTask = (task: string) => {
        setTaskList([...taskList, task]);
      }

      function handleDeleteTask(taskToDelete: string){
        const newTasks = taskList.filter(task => task !== taskToDelete);
        setTaskList(newTasks);
      }

    return(
        <div className="taskList">
          <h1>Task List</h1>
          <TaskList taskList={taskList} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />
        </div>
    );
}