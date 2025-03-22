import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../store/slices/expenseSlice";
import { Button, notification } from "antd";

const ExpenseForm = () => {
    const expenseType = ["Office Rent", "Salary", "Office Supplies", "Marketing", "Meeting"];
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.open({
            message: "Notification Title",
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

    useEffect(() => {
        console.log("FORM DATA: ", formData);
    }, [formData]);

    return (
        <div className={styles.container}>
            {contextHolder}
            <Button
                type="primary"
                onClick={openNotification}
            >
                Open the notification box
            </Button>
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
                    value={formData.amount}
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
                    className={styles.submitButton}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
