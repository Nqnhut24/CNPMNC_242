import React from 'react';
import { Navigate } from 'react-router-dom';
import { notification } from 'antd';

const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (userRole !== allowedRole) {
        notification.error({
            message: 'Access Denied',
            description: `This page is only accessible to ${allowedRole}s`
        });
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;