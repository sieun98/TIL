// 액션 타입 정의
const ADD_TODO = "todos/ADD_TODO";
const COMPLETE_TODO = "todos/COMPLETE_TODO";

// 액션 생성 함수
export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}
export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}

// 초기값
const initialState = [];

// 리듀서
export default function reducer(prevState = initialState, action) {
  if (action.type === ADD_TODO) {
    return [...prevState, { text: action.text, done: false }];
  }
  if (action.type === COMPLETE_TODO) {
    return prevState.map((todo, idx) => {
      if (idx === action.index) {
        return { ...todo, done: true };
      }
      return todo;
    });
  }

  return prevState;
}
