import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import tasksSlice from "./tasksSlice.js";
import taskSlice from "./taskSlice.js";
import reporterSlice from "./reporterSlice.js";

const store = configureStore({
  reducer: {
    User: userSlice,
    Tasks: tasksSlice,
    Task: taskSlice,
    Reporter: reporterSlice,
  },
});

export default store;