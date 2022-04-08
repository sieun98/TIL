import React, { useRef } from "react";
import useReduxDispatch from "../hooks/useReduxDispatch";
import { addTodo } from "../redux/actions";

function TodoForm() {
  const inputRef = useRef();
  const dispatch = useReduxDispatch();
  return (
    <div>
      <input ref={inputRef} />
      <button
        onClick={() => {
          dispatch(addTodo(inputRef.current.value));
          inputRef.current.value = "";
        }}
      >
        추가
      </button>
    </div>
  );
}

export default TodoForm;
