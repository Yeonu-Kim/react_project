import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const todos = useSelector((state) => state.todos);
  const count = todos.filter((todo) => todo.completed === true).length;

  return <h4 className="mt-3">Total Complete Items: {count}</h4>;
};

export default TotalCompleteItems;
