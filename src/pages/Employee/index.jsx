import React, { useState } from "react";
import styles from "./style.module.css";

const ExpenseForm = () => {
    const departments = ["HR", "IT", "Finance", "Marketing", "Operations", "Sales", "Engineering"];

    const [formData, setFormData] = useState({
        employeeName: "",
        amount: "",
        reason: "",
        calendar: "",
        tripPlace: "",
        startTime: "",
        endTime: "",
        tripReason: "",
        numMembers: "",
        members: [{ name: "", department: "", id: "" }],
    });

    const handleChange = (e, index = null, field = null) => {
        if (index !== null && field) {
            const updatedMembers = [...formData.members];
            updatedMembers[index][field] = e.target.value;
            setFormData({ ...formData, members: updatedMembers });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const addMember = () => {
        setFormData({
            ...formData,
            members: [...formData.members, { name: "", department: "", id: "" }],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Request sent successfully!");
    };

    return (
        <div className={styles.container}>
            <h2>EXPENSE MANAGEMENT SYSTEM (EMS)</h2>
            <i>Hi, employee!</i>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <h3>Submit Expense Request</h3>

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                />
                <textarea
                    name="reason"
                    placeholder="Reason for expense"
                    onChange={handleChange}
                ></textarea>

                <h3>Business Trip Plan</h3>
                <input
                    type="date"
                    name="calendar"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="tripPlace"
                    placeholder="Trip Place"
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    name="startTime"
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    name="endTime"
                    onChange={handleChange}
                />
                <textarea
                    name="tripReason"
                    placeholder="Reason for the business trip"
                    onChange={handleChange}
                ></textarea>

                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
