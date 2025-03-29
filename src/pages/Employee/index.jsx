import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../layout/layout";
import { sendRequest } from "../../store/slices/expenseSlice";
import styles from "./style.module.css";
import "./Employee.css";
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
        statusEnum: "PENDING",
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("userEmail");
        if (!token || !userEmail) {
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = localStorage.getItem("userEmail");

        // Validation logic
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Request Name is required";
        }
        if (!formData.expenseType) {
            errors.expenseType = "Please select an expense type";
        }
        if (!formData.expense || isNaN(formData.expense) || Number(formData.expense) <= 0) {
            errors.expense = "Expense amount must be a positive number";
        }

        // If there are errors, set formErrors and focus on the first error field
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);

            // Focus on the first error field
            const firstErrorField = Object.keys(errors)[0];
            document.getElementsByName(firstErrorField)[0]?.focus();

            return;
        }

        setFormErrors({}); // Clear errors if validation passes

        try {
            await dispatch(
                sendRequest({
                    ...formData,
                    expense: Number(formData.expense),
                    employeeEmail: userEmail, // Add email to request
                }),
            ).unwrap();

            notification.success({
                message: "Success",
                description: "Request submitted successfully!",
            });
            openNotification();
            // Reset form after successful submission
            setFormData({
                name: "",
                expense: "",
                expenseType: "",
                description: "",
                statusEnum: "PENDING",
            });
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.message || "Failed to submit request",
            });
        }
    };

    const openNotification = () => {
        api.open({
            message: "Successfully request",
            description: "Wait for manager to approve your request. You can check your requests in the history page.",
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
        const { name, value } = e.target;

        // Cập nhật giá trị form
        setFormData({ ...formData, [name]: value });

        // Xóa lỗi của trường hiện tại nếu có
        if (formErrors[name]) {
            setFormErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[name];
                return updatedErrors;
            });
        }
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
                <Button
                    type="primary"
                    onClick={() => navigate("/history")}
                    size="large"
                >
                    View your requests
                </Button>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <div className={styles.title}>
                        <h2>EXPENSE MANAGEMENT SYSTEM (EMS)</h2>
                        <i>
                            Hi, {localStorage.getItem("userName") || "employee"}, Let create an expense request for your
                            job!
                        </i>
                    </div>
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
                    {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}

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
                    {formErrors.expenseType && <p className={styles.error}>{formErrors.expenseType}</p>}

                    <input
                        type="number"
                        name="expense"
                        placeholder="Amount"
                        value={formData.expense}
                        onChange={handleChange}
                    />
                    {formErrors.expense && <p className={styles.error}>{formErrors.expense}</p>}

                    <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Reason for expense"
                        onChange={handleChange}
                    ></textarea>
                    {formErrors.description && <p className={styles.error}>{formErrors.description}</p>}

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
