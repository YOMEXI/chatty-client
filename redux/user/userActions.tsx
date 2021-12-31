import axios from "axios";

import { pending, searchFail, searchSuccess } from "./userSlice";

export const search = (value: any) => async (dispatch: any) => {
  try {
    dispatch(pending());

    const { data } = await axios.get(`/api/user/${value}`);

    dispatch(searchSuccess(data));
  } catch (error: any) {
    dispatch(searchFail(error.data));
  }
};
