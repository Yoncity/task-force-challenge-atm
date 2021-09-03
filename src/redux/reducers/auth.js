import * as types from "../actionTypes/auth";
import initialState from "../initialState";

const authenticate = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case types.AUTH_START:
      return { loading: true, error: null, user: null };
    case types.AUTH_SUCCESS:
      return { loading: false, error: null, user: payload.user };
    case types.AUTH_ERROR:
      return { loading: false, error: payload.error, user: null };
    default:
      return state;
  }
};

export default authenticate;
