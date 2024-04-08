import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TotalCompleteItems from "./TotalCompleteItems";

const Main = () => {
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default Main;
