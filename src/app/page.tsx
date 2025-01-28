"use client";

import { useEffect, useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    todos.push(data);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos?id=${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-12">
      <div className="w-[800px] mx-auto bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">Todo App</h1>

        <form onSubmit={addTodo} className="flex w-full gap-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 text-lg border-2 border-gray-200 rounded-xl p-4 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none"
            placeholder="Add new todo"
          />
          <button
            type="submit"
            className="w-[200px] bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </form>

        <div className="mt-12 space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all"
            >
              <span className="text-xl text-gray-700 w-[500px] truncate">
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="min-w-[150px] bg-red-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
