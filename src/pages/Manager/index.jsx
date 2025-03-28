import { Button, Space, Table, Tag, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Layout from "../../layout/layout";
import axios from "axios";

function Manager() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    // Add pagination state
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const fetchRequests = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            // Updated URL with correct query parameter names
            const response = await axios.get(`http://localhost:8080/api/v1/requests/employee?currentPage=${page}&pageSize=${pageSize}&sortBy=id&ascending=true`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.isSuccess) {
                const formattedData = response.data.data.map(item => ({
                    key: item.id,
                    stt: item.id,
                    description: item.description,
                    status: item.statusEnum,
                    amount: item.expense,
                    time: new Date(item.createdAt).toLocaleString(),
                    expenseType: item.expenseType,
                    tags: [item.expenseType],
                    name: item.name || 'N/A'
                }));
                setRequests(formattedData);
                
                // Update pagination state
                setPagination({
                    current: response.data.currentPage,
                    pageSize: response.data.pageSize,
                    total: response.data.totalPage * response.data.pageSize
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error.response?.data?.message || 'Failed to fetch requests'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
        fetchRequests(); // Fetch requests when component mounts
    }, [navigate]);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `${amount.toLocaleString()} VND`
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Expense Type",
            key: "expenseType",
            dataIndex: "tags",
            render: (tags) => (
                <>
                    {tags.map((tag) => {
                        let color = 'geekblue';
                        return (
                            <Tag color={color} key={tag}>
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
            render: (status) => (
                <Tag color={
                    status === 'PENDING' ? 'gold' :
                    status === 'FINANCE_ACCEPTED' ? 'green' :
                    status === 'FINANCE_REJECTED' ? 'red' : 'default'
                }>
                    {status}
                </Tag>
            )
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

    // Add handler for table pagination
    const handleTableChange = (newPagination, filters, sorter) => {
        fetchRequests(newPagination.current, newPagination.pageSize);
    };

    return (
        <Layout title="Request History">
            <div className={styles.container}>
                <h1>EXPENSE MANAGEMENT SYSTEM (EMS)</h1>
                <i>Hi {userName}, here are your requests!</i>
                <h3>Expense Request History</h3>
                <Table
                    columns={columns}
                    dataSource={requests}
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Total ${total} items`
                    }}
                    onChange={handleTableChange}
                />
            </div>
        </Layout>
    );
}

export default Manager;
