import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./slices/expenseSlice"; // Import your slice reducer

export const store = configureStore({
    reducer: {
        expense: expenseReducer, // Register the counter slice reducer
    },
});

export default store;
