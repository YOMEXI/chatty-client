import axios from "axios";

import { postPending, createpostSuccess, createpostFail } from "./postSlice";

export const createPost = (value: any) => async (dispatch: any) => {
  try {
    dispatch(postPending());

    const { data } = await axios.post("/api/posts/create", value);

    dispatch(createpostSuccess(data));
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (error: any) {
    dispatch(createpostFail(error.data));
  }
};
