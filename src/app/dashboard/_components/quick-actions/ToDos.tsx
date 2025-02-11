import React from "react";
import Card from "../Card";
import TodoList from "./ToDoList";
export default function ToDos() {
  return (
    <Card bg="bg-gray-50" padding="p-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-[16px] font-semibold">To-do List</h2>
        <h2 className="text-lg font-semibold">2/8</h2>
      </div>
      <TodoList />
    </Card>
  );
}
