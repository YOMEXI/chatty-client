import { createSlice } from "@reduxjs/toolkit";

//

export const initialState = {
  // users: {},
  loading: false,
  text: "",
  results: [],
  error: "",
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    pending: (state) => {
      state.loading = true;
    },

    searchSuccess: (state, action) => {
      state.loading = false;
      state.results = action.payload;
    },
    searchFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { pending, searchFail, searchSuccess } = userSlice.actions;
export default userSlice.reducer;
