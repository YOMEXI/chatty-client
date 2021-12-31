import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import postSlice from "./posts/postSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
  reducer: { auth: authSlice, User: userSlice, Post: postSlice },
});

export default store;
