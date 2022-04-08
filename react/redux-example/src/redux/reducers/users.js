import { GET_USERS_START, GET_USERS_SUCCESS, GET_USERS_FAIL } from "../actions";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

function users(state = initialState, action) {
  if (action.type === GET_USERS_START) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: action.data,
    };
  }
  if (action.type === GET_USERS_FAIL) {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }
  return state;
}

export default users;
