import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; // Import your slice reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Register the counter slice reducer
  },
});

export default store;