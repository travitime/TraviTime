'use client';
import React, { useState } from "react";
import Card from "../Card";
import TodoList, { Task } from "./ToDoList";
export default function ToDos() {
  const [tasks] = useState<Task[]>([]);
  const completedTasks = tasks.filter((task) => task.completed).length;
  return (
    <Card bg="bg-gray-50" padding="p-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-[16px] font-semibold">To-do List</h2>
        <h2 className="text-lg font-semibold">
          {completedTasks}/{tasks.length}
        </h2>
      </div>
      {tasks.length > 0 && <TodoList tasks={tasks} />}
    </Card>
  );
}
