import { createSlice } from "@reduxjs/toolkit";

//

export const initialState = {
  // users: {},
  loading: false,
  success: "",
  post: [],
  error: "",
};

const postSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    postPending: (state) => {
      state.loading = true;
    },
    postSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    postFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createpostFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createpostSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.msg;
      // state.post = action.payload;
    },
  },
});
export const {
  postPending,
  postSuccess,

  postFail,
  createpostSuccess,
  createpostFail,
} = postSlice.actions;
export default postSlice.reducer;
