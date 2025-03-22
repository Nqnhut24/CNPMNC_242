import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";
export const sendRequest = createAsyncThunk("expense/send", async (params, { rejectWithValue }) => {
    try {
        const response = await api.sendRequest(params);
        return response.data; // This will be the `fulfilled` payload
    } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong"); // Handle errors
    }
});

const counterSlice = createSlice({
    name: "expense",
    initialState: {
        expenseInfo: {
            employeeId: null,
            amount: 0,
            description: null,
        },
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
