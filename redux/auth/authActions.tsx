import axios from "axios";

import {
  pending,
  registerFail,
  registerSuccess,
  loginFail,
  loginSuccess,
} from "./authSlice";

export const register = (value: any, router: any) => async (dispatch: any) => {
  try {
    dispatch(pending());

    const { data } = await axios.post("/api/register", value);

    dispatch(registerSuccess(data));
  } catch (error: any) {
    dispatch(registerFail(error.data));
  }
};

export const login = (value: any, router: any) => async (dispatch: any) => {
  try {
    dispatch(pending());

    const { data } = await axios.post("/api/login", value, {
      withCredentials: true,
      headers: { crossDomain: true, "Content-Type": "application/json" },
    });

    window.localStorage.setItem("user", JSON.stringify(data));

    dispatch(loginSuccess(data));
    setTimeout(() => {
      router.push("/");
    }, 10000);
  } catch (error: any) {
    dispatch(loginFail(error.data));
  }
};
