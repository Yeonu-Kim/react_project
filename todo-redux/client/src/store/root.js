import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const rootStore = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export default rootStore;
