import { createSlice } from "@reduxjs/toolkit";

//

const auth = () => {
  if (typeof window !== "undefined" && localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } else {
    return null;
  }
};
export const initialState = {
  // users: {},
  loading: false,
  user: auth(),

  error: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    pending: (state) => {
      state.loading = true;
    },

    registerSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.message;
      state.user = JSON.parse(localStorage.getItem("user") || "{}");
    },
  },
});
export const {
  pending,
  registerFail,
  registerSuccess,
  loginSuccess,
  loginFail,
} = authSlice.actions;
export default authSlice.reducer;
