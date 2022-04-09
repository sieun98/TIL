// 액션 타입 정의
const SHOW_ALL = "filter/SHOW_ALL";
const SHOW_COMPLETE = "filter/SHOW_COMPLETE";

// 액션 생성 함수
export function showAll() {
  return {
    type: SHOW_ALL,
  };
}
export function showComplete() {
  return {
    type: SHOW_COMPLETE,
  };
}

// 초기값
const initialState = "ALL";

// 리듀서
export default function reducer(prevState = initialState, action) {
  if (action.type === SHOW_ALL) {
    return "ALL";
  }
  if (action.type === SHOW_COMPLETE) {
    return "COMPLETE";
  }

  return prevState;
}
