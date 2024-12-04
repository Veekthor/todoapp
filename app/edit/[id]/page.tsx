"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Task = {
  id: number;
  title: string;
  color: string;
  completed: boolean;
};

interface Props {
  params: { id: string };
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`${apiBaseUrl}/api/tasks/${id}`);
      const data = await res.json();
      setTask(data);
      setTitle(data.title);
      setColor(data.color);
    };

    if (id) fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !color) return;

    const res = await fetch(`${apiBaseUrl}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, color, completed: task?.completed }),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  if (!task) return <p className="text-white">Loading...</p>;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-md space-y-4"
      >
        <div>
          <p
            className="text-white cursor-pointer hover:underline"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </p>
        </div>
        <div>
          <label className="block text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-2 rounded-md text-black"
            placeholder="Task title"
          />
        </div>
        <div>
          <label className="block text-white">Color</label>
          <div className="flex space-x-2 mt-2">
            {["red", "yellow", "green", "blue", "purple"].map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                onClick={() => setColor(colorOption)}
                className={`w-8 h-8 rounded-full ${
                  colorOption === color ? "border-2 border-black" : ""
                }`}
                style={{ backgroundColor: colorOption }}
              ></button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
