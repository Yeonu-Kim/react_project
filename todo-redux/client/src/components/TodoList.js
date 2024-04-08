import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <ul className="list-group">
      {todos.map((todo, key) => (
        <TodoItem
          key={key}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
