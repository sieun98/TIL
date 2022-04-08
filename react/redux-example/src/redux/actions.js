export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const SHOW_ALL = "SHOW_ALL";
export const SHOW_COMPLETE = "SHOW_COMPLETE";

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

// users
export const GET_USERS_START = "GET_USERS_START"; // 깃험 api 호출 시작
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"; // 깃헙 api 응답이 성공적인 경우
export const GET_USERS_FAIL = "GET_USERS_FAIL"; // 깃헙 api 응답이 샐패한 경우

export function getUsersStart() {
  return {
    type: GET_USERS_START,
  };
}
export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESS,
    data,
  };
}
export function getUsersFail(error) {
  return {
    type: GET_USERS_FAIL,
    error,
  };
}
