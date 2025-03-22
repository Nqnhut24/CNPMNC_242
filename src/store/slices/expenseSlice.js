import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "expense",
    initialState: {
        expenseInfo: {
            employeeId: "2212481",
            amount: 12000000,
            description: "Đã bao gồm chi phí di chuyển, lưu trú và vào khu vui chơi",
        },
        tripInfo: {
            startDate: "23-03-2025",
            endDate: "25-03-2025",
            place: "Nha Trang Luxury Resort",
            reason: "Team building 2025",
            members: ["2212481", "2113578"],
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
