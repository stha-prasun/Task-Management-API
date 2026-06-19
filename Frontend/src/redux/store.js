import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import tasksSlice from "./tasksSlice.js";

const store = configureStore({
  reducer: {
    User: userSlice,
    Tasks: tasksSlice,
  },
});

export default store;