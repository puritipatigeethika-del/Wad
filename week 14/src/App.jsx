import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");

  // Add Task
  const addTask = () => {
    if (inputValue.trim() !== "" && deadlineValue !== "") {
      const now = new Date();

      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
          createdAt: now.toLocaleString(),
          deadline: deadlineValue,
        },
      ]);

      setInputValue("");
      setDeadlineValue("");
    }
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Reminder Check (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        if (!task.completed) {
          const deadlineTime = new Date(task.deadline);
          const diff = deadlineTime - now;

          if (diff <= 60000 && diff > 0) {
            alert(`Reminder: "${task.text}" is due soon!`);
          }
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  const activeTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <div className="header">
          <h1>Todo App</h1>
          <p>Stay organized and productive</p>
        </div>

        <div className="card">
          {/* Input Section */}
          <div className="input-row">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
            />

            <input
              type="datetime-local"
              value={deadlineValue}
              onChange={(e) => setDeadlineValue(e.target.value)}
            />

            <button onClick={addTask}>Add</button>
          </div>

          {/* Counter */}
          {tasks.length > 0 && (
            <div className="counter">
              {activeTasks} task{activeTasks !== 1 && "s"} remaining
            </div>
          )}

          {/* Task List */}
          {tasks.map((task) => {
            const isOverdue =
              new Date(task.deadline) < new Date() && !task.completed;

            return (
              <div
                key={task.id}
                className={`task 
                  ${task.completed ? "completed" : ""} 
                  ${isOverdue ? "overdue" : ""}`}
              >
                <span
                  className={task.completed ? "completed-text" : ""}
                  onClick={() => toggleTask(task.id)}
                >
                  <strong>{task.text}</strong>
                  <br />
                  <small>Added: {task.createdAt}</small>
                  <br />
                  <small>
                    Deadline:{" "}
                    {new Date(task.deadline).toLocaleString()}
                  </small>
                </span>

                <button onClick={() => deleteTask(task.id)}>✕</button>
              </div>
            );
          })}

          {/* Clear Completed */}
          {tasks.some((task) => task.completed) && (
            <button
              className="clear-btn"
              onClick={() =>
                setTasks(tasks.filter((task) => !task.completed))
              }
            >
              Clear completed tasks
            </button>
          )}
        </div>

        <div className="footer">
          Click on tasks to mark them complete
        </div>
      </div>
    </div>
  );
}
