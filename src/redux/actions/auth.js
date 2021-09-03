import * as types from "../actionTypes/auth";

const authStarted = () => ({
  type: types.AUTH_START,
});
const authSuccess = (user) => ({
  type: types.AUTH_SUCCESS,
  payload: { user },
});
const authError = (error) => ({
  type: types.AUTH_ERROR,
  payload: { error },
});

const authenticate = (data) => async (dispatch) => {
  authStarted();

  try {
    authSuccess({});
  } catch (error) {
    authError(error.message);
  }
};

export default authenticate;
