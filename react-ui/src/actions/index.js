import { AUTH_USER, AUTH_ERROR } from "./types";
import auth from "../apis/auth";

export const signUp = (formValues, callBack) => async (dispatch) => {
  await auth
    .post("/signup", formValues)
    .then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.token,
      });
      localStorage.setItem("token", response.data.token);
      callBack();
    })
    .catch((error) => {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.error,
      });
    });
};

export const signIn = (formValues, callBack) => async (dispatch) => {
  await auth
    .post("/signin", formValues)
    .then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.token,
      });
      localStorage.setItem("token", response.data.token);
      callBack();
    })
    .catch((error) => {
      dispatch({
        type: AUTH_ERROR,
        payload: "Invalid login credentials",
      });
    });
};

export const signOut = (callBack) => {
  localStorage.removeItem("token");

  callBack();

  return {
    type: AUTH_USER,
    payload: "",
  };
};
