import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import tasksSlice from "./tasksSlice.js";
import taskSlice from "./taskSlice.js";

const store = configureStore({
  reducer: {
    User: userSlice,
    Tasks: tasksSlice,
    Task: taskSlice,
  },
});

export default store;