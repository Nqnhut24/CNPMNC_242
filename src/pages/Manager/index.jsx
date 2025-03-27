import { Button, Space, Table, Tag, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Layout from "../../layout/layout";

function Manager() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Check auth and role
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        const storedUserName = localStorage.getItem('userName');

        if (!token) {
            navigate('/login');
            return;
        }

        if (userRole !== 'EMPLOYEE') {
            notification.error({
                message: 'Access Denied',
                description: 'Only employees can access this page'
            });
            navigate('/login');
            return;
        }

        setUserName(storedUserName || 'Employee');
    }, [navigate]);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Expense Type",
            key: "expenseType",
            dataIndex: "expenseType",
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag
                                color={color}
                                key={tag}
                            >
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary">Update</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: "1",
            stt: 1,
            description: "All cost for IT Department's Team building in Nha Trang",
            status: "Pending",
            amount: 4890000,
            time: "23-02-2025 12:42:12",
            tags: ["Travel"],
        },
    ];

    return (
        <Layout title="Manager">
            <div className={styles.container}>
                <h1>EXPENSE MANAGEMENT SYSTEM (EMS)</h1>
                <i>Hi {userName}, Let explore your request!</i>
                <h3>Expense Request</h3>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </Layout>
    );
}

export default Manager;
