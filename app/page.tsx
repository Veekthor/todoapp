"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);

  useEffect(() => {
    // Fetch tasks from the back-end API
    const fetchTasks = async () => {
      const res = await fetch(`${apiBaseUrl}/api/tasks`);
      const data = await res.json();
      setTasks(data);
      setCompletedCount(data.filter((task: Task) => task.completed).length);
    };

    fetchTasks();
  }, []);

  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    const res = await fetch(`${apiBaseUrl}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });

    if (res.ok) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
      setCompletedCount((prev) => prev + (completed ? -1 : 1));
    }
  };

  const deleteTask = async (id: number) => {
    const res = await fetch(`${apiBaseUrl}/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
      setCompletedCount(
        (prev) =>
          prev - (tasks.find((task) => task.id === id)?.completed ? 1 : 0)
      );
    }
  };

  return (
    <>
      <div className="w-full mb-6">
        <Link href="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Create Task
          </button>
        </Link>
      </div>

      <div className="mb-4 flex justify-between text-white">
        <p className="text-lg">Tasks: {tasks.length}</p>
        <p className="text-lg">
          Completed: {completedCount} of {tasks.length}
        </p>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">
            You don't have any tasks registered yet.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-4 bg-gray-800 text-white rounded-md"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, task.completed)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="space-x-2">
                <Link href={`/edit/${task.id}`}>
                  <button className="text-yellow-500">Edit</button>
                </Link>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
