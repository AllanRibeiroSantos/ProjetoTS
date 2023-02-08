import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

// NOTA: eu não instalei o uuid no PC, vamos ver até onde vai sem instalar.

export default function App() {
  const [task, setTask] = useState([]);

  // Cria um array de objetos dentro do estado. Uma para cada task.
  function addTaskHandler(event) {
    if (event.key == "Enter" && event.target.value != "") {
      setTask([
        ...task,
        {
          tarefa: event.target.value,
          id: uuidv4(),
        },
      ]);
      event.target.value = "";
    }
  }
  
  // Faz manter todos os objetos que não sejam o que foi clicado.
  function RemoveTaskHandler(id) {
    const removeTask = task.filter((task) => task.id !== id);
    console.log("Pop: ", removeTask);
    setTask(removeTask);
  }
  
  return (
    <div>
      <p>LISTA DE TAREFAS</p>
      <label>Escreva sua tarefa</label>
      <input type="text" onKeyDown={(event) => addTaskHandler(event)} />
      {task.map((task) => (
        <p key={task.id}>
          {task.tarefa}
          <span 
            onClick={() => RemoveTaskHandler(task.id)} style={{ cursor: 'pointer' }}>
              [x]
          </span>
        </p>
      ))}
    </div>
  );
}

