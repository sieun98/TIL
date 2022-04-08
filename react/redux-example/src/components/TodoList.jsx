import React from "react";
import useReduxState from "../hooks/useReduxState";
import todos from "../redux/reducers/todos";

function TodoList() {
  const state = useReduxState();
  return (
    <ul>
      {state.todos.map((todo, idx) => (
        <li key={idx}>{todo.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
