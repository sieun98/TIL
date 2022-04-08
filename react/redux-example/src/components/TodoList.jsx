function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, idx) => (
        <li key={idx}>{todo.text}</li>
      ))}
    </ul>
  );
}

export default TodoList;
