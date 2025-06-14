import { useEffect, useState } from "react";
import Addtasks from "./components/Addtasks";
import Tasks from "./components/tasks";
import {v4} from 'uuid'

function App() {
  const [tasks, SetTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

 function onTaskClick(taskId) {
  const newTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });
  SetTasks(newTasks);
}

  function onDeleteTaskClick(taskId){
    const newTasks = tasks.filter(task => task.id != taskId);
    SetTasks(newTasks);

  }

  function onAddTaskSubmit (title, description){
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    SetTasks([...tasks, newTask])

    
  }
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <Addtasks  onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  );
}
export default App;
