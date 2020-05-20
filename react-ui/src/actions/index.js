import { SIGN_UP, SIGN_IN } from "./type";
import auth from "../apis/auth";

export const signUp = (formValues) => {
  return async (dispatch) => {
    const response = await auth.post("/signup");

    dispatch({
      type: SIGN_UP,
      payload: response.data,
    });
  };
};
