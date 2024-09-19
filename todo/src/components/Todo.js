import React, { useState, useEffect } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === "") return;
    setTasks([...tasks, { text: inputValue }]);
    setInputValue("");
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1 className="text-center text-white pt-4">Daily Tasks To-dos</h1>
      <div className="input-group pt-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn text-white bg-black" onClick={addTask}>
          <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>

      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? "list-group-item-success" : ""
            }`}
          >
            <span
              onClick={() => toggleTaskCompletion(index)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(index)}
            >
              Delate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
