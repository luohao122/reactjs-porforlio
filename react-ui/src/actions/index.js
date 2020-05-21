import { AUTH_USER } from "./types";
import auth from "../apis/auth";

export const signUp = (formValues) => async (dispatch) => {
  const response = await auth.post("/signup", formValues);

  // dispatch({
  //   type: AUTH_USER,
  //   payload: response.data,
  // });
};
