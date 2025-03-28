import React from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./layout.module.css";

const Layout = ({ children, title }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all auth-related data
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        console.log("User logged out");
        navigate("/login");
    };

    return (
        <div className={styles.layout}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.logoutButton} onClick={handleLogout}>
                    <PoweroffOutlined style={{ fontSize: "20px", color: "red", cursor: "pointer" }} />
                    <span className={styles.logoutText}>Log out</span>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.content}>{children}</main>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>© 2025 Expense Management System. Powered by J98. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;