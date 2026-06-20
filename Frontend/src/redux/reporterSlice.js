import { createSlice } from "@reduxjs/toolkit";

const reporterSlice = createSlice({
  name: "reporter",
  initialState: {
    loggedInReporter: null,
  },
  reducers: {
    setLoggedInReporter: (state, action) => {
      state.loggedInReporter = action.payload;
    },
  },
});

export const { setLoggedInReporter } = reporterSlice.actions;
export default reporterSlice.reducer;