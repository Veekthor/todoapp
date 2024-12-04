"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !color) return;

    const res = await fetch(`${apiBaseUrl}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, color }),
    });

    if (res.ok) {
      router.push("/");
    }
  };

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
            Add Task
          </button>
        </div>
      </form>
    </>
  );
}
