import React, { useRef } from "react";

function TodoForm({ add }) {
  const inputRef = useRef();

  return (
    <div>
      <input ref={inputRef} />
      <button
        onClick={() => {
          add(inputRef.current.value);
          inputRef.current.value = "";
        }}
      >
        추가
      </button>
    </div>
  );
}

export default TodoForm;
