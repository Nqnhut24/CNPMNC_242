import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { PoweroffOutlined } from "@ant-design/icons"; // Import power icon from Ant Design
import { useDispatch } from "react-redux";
import { sendRequest } from "../../store/slices/expenseSlice";
import { Button, notification } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../../layout/layout";

const ExpenseForm = () => {
    const navigate = useNavigate();
    const expenseType = ["Office Rent", "Salary", "Office Supplies", "Marketing", "Meeting"];
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    
    // Initialize form data to include name
    const [formData, setFormData] = useState({
        name: "",
        expense: "",
        expenseType: "",
        description: "",
        statusEnum: "PENDING"
    });

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        if (!token || !userEmail) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = localStorage.getItem('userEmail');

        if (!formData.expenseType || !formData.expense || !formData.description) {
            notification.error({
                message: 'Validation Error',
                description: 'Please fill in all fields!'
            });
            return;
        }

        try {
            await dispatch(sendRequest({ 
                ...formData,
                expense: Number(formData.expense),
                employeeEmail: userEmail // Add email to request
            })).unwrap();
            
            notification.success({
                message: 'Success',
                description: 'Request submitted successfully!'
            });
            // Reset form after successful submission
            setFormData({
                name: "",
                expense: "",
                expenseType: "",
                description: "",
                statusEnum: "PENDING"
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to submit request'
            });
        }
    };

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        console.log("User logged out");
        navigate("/login"); // Redirect to the login page
    };

    useEffect(() => {
        console.log("FORM DATA: ", formData);
    }, [formData]);

    return (
        <Layout title="Expense Management System">
            <div className={styles.container}>
                {contextHolder}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div>
                        <h2>EXPENSE MANAGEMENT SYSTEM (EMS)</h2>
                        <i>Hi, {localStorage.getItem('userName') || 'employee'}!</i>
                    </div>
                    <Button 
                        type="primary"
                        onClick={() => navigate('/history')}
                        size="large"
                    >
                        View your requests
                    </Button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                >
                    <h3>Expense Request Form</h3>

                    <input
                        type="text"
                        name="name"
                        placeholder="Request Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

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
                        className={styles.submitButton}
                    >
                        Send
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default ExpenseForm;
