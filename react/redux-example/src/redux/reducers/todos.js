import { ADD_TODO, COMPLETE_TODO } from "../actions";

const initialState = [];

export default function todos(prevState = initialState, action) {
  // 초기값 설정
  //   if (prevState === undefined) {
  //     return [];
  //   }
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
