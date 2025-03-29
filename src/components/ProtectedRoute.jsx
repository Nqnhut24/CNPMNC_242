import React from "react";
import { Navigate } from "react-router-dom";
import { notification } from "antd";

const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
        notification.error({
            message: "Authentication Required",
            description: "Please login to access this page",
        });
        return <Navigate to="/login" />;
    }

    if (userRole !== allowedRole) {
        notification.error({
            message: "Access Denied",
            description: `This page is only accessible to ${allowedRole} role`,
        });

        // Redirect based on user's role
        if (userRole === "EMPLOYEE") {
            return <Navigate to="/request" />;
        } else if (userRole === "FINANCE_MANAGER") {
            return <Navigate to="/finance" />;
        } else if (userRole === "MANAGER") {
            alert("PROTECTED ROUTE MANAGER");
            return <Navigate to="/manager" />;
        } else {
            return <Navigate to="/login" />;
        }
    }

    return children;
};

export default ProtectedRoute;
