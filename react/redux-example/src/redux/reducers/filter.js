import { SHOW_ALL, SHOW_COMPLETE } from "../actions";

const initialState = "ALL";

export default function filter(prevState = initialState, action) {
  if (action.type === SHOW_ALL) {
    return "ALL";
  }
  if (action.type === SHOW_COMPLETE) {
    return "COMPLETE";
  }

  return prevState;
}
