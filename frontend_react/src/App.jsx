import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/task", {
      headers: {
        Accept: "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do List</h1>
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            Estado: {task.completed ? "Completada" : "Pendiente"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;