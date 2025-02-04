import React from "react";
import Card from "../Card";
const tasks = [
  {
    text: "Share tickets with Juliana Spears",
    time: "Sep 13, 8:30 AM",
    completed: true,
  },
  {
    text: "Send Quote with Karthik Arumigam",
    time: "Sep 13, 8:30 AM",
    completed: true,
  },
  {
    text: "Create a quote for prospect Jasmine Flinch",
    time: "Sep 13, 8:30 AM",
    completed: false,
  },
  {
    text: "Give more Hotel options to Jasmine Flinch",
    time: "Sep 13, 8:30 AM",
    completed: false,
  },
  {
    text: "Get approval for 10% discount for Jasmine Flinch",
    time: "Sep 13, 8:30 AM",
    completed: false,
  },
];

export default function TodoList() {
  const completedCount = tasks.filter((task) => task.completed).length;
  return (
    <Card className="">
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b last:border-b-0"
          >
            <div>
              <p
                className={`text-regular ${
                  task.completed ? "text-gray-400" : "text-gray-900 font-medium"
                }`}
              >
                {task.text}
              </p>
              <p className="text-sm text-gray-400">{task.time}</p>
            </div>
            <div
              className={`w-5 h-5 flex items-center justify-center rounded-full ${
                task.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {task.completed && <span className="text-white text-xs">✔</span>}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4 space-x-2">
        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>
    </Card>
  );
}
