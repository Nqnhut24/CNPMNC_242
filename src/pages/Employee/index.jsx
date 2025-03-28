import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { PoweroffOutlined } from "@ant-design/icons"; // Import power icon from Ant Design
import { useDispatch } from "react-redux";
import { sendRequest } from "../../store/slices/expenseSlice";
import { Button, notification } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

const ExpenseForm = () => {
    const navigate = useNavigate();
    const expenseType = ["Office Rent", "Salary", "Office Supplies", "Marketing", "Meeting"];
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: "Successfully request",
            description:
                "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            icon: (
                <SmileOutlined
                    style={{
                        color: "#108ee9",
                    }}
                />
            ),
        });
    };
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        expense: "",
        expenseType: "",
        description: "",
        statusEnum: "PENDING",
        employeeEmail: "tien@gmail.com",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.expenseType || !formData.expense || !formData.description) {
            alert("Please fill in all fields!");
            return;
        }

        dispatch(sendRequest({ ...formData, expense: Number(formData.expense) }));
    };

    const handleLogout = () => {
        console.log("User logged out");
        navigate("/login"); // Redirect to the login page
    };

    useEffect(() => {
        console.log("FORM DATA: ", formData);
    }, [formData]);

    return (
        <div className={styles.container}>
            {contextHolder}

            <h2>EXPENSE MANAGEMENT SYSTEM (EMS)</h2>

            <i>Hi, employee!</i>
            <form
                onSubmit={handleSubmit}
                className={styles.form}
            >
                <h3>Expense Request Form</h3>

                <select
                    value={formData.expenseType}
                    onChange={handleChange}
                    name="expenseType"
                >
                    <option value="">Select Expense Type</option>
                    {expenseType.map((dept, i) => (
                        <option
                            key={i}
                            value={dept}
                        >
                            {dept}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="expense"
                    placeholder="Amount"
                    value={formData.expense}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    value={formData.description}
                    placeholder="Reason for expense"
                    onChange={handleChange}
                ></textarea>

                <button
                    type="submit"
                    onClick={openNotification}
                    className={styles.submitButton}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
