import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Button, Modal, Space, Table, Tag, notification } from "antd";
import Layout from "../../layout/layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RequestHistory() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchRequests = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:8080/api/v1/requests?currentPage=${page}&pageSize=${pageSize}&sortBy=id&ascending=true`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.isSuccess) {
                const formattedData = response.data.data.map((item) => ({
                    key: item.id,
                    id: item.id,
                    name: item.name || "N/A",
                    amount: item.expense,
                    reason: item.description,
                    status: item.statusEnum,
                    time: new Date(item.createdAt).toLocaleString(),
                    tags: [item.expenseType],
                    createdBy: item.createdBy,
                }));
                setRequests(formattedData);
                setPagination({
                    current: response.data.currentPage,
                    pageSize: response.data.pageSize,
                    total: response.data.totalPage * response.data.pageSize,
                });
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.response?.data?.message || "Failed to fetch requests",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("userRole");

        if (!token) {
            navigate("/login");
            return;
        }

        if (userRole !== "FINANCE_MANAGER") {
            notification.error({
                message: "Access Denied",
                description: "Only finance managers can access this page",
            });
            navigate("/login");
            return;
        }

        fetchRequests();
    }, [navigate]);

    const handleTableChange = (newPagination, filters, sorter) => {
        fetchRequests(newPagination.current, newPagination.pageSize);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
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
            render: (amount) => `${amount.toLocaleString()} VND`,
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Expense Type",
            key: "tags",
            dataIndex: "tags",
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag
                            color="blue"
                            key={tag}
                        >
                            {tag.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            key: "createdBy",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag
                    color={
                        status === "PENDING"
                            ? "gold"
                            : status === "FINANCE_ACCEPTED"
                            ? "green"
                            : status === "FINANCE_REJECTED"
                            ? "red"
                            : "default"
                    }
                >
                    {status}
                </Tag>
            ),
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
                    <Button
                        type="primary"
                        onClick={() => handleAccept(record)}
                        disabled={record.status !== "PENDING"}
                    >
                        Accept
                    </Button>
                    <Button
                        danger
                        onClick={() => handleReject(record)}
                        disabled={record.status !== "PENDING"}
                    >
                        Reject
                    </Button>
                </Space>
            ),
        },
    ];

    const handleAccept = async (record) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:8080/api/v1/requests/accept",
                {
                    requestId: record.id,
                    financeAccept: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            notification.success({
                message: "Success",
                description: "Request accepted successfully",
            });
            fetchRequests(pagination.current, pagination.pageSize);
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.response?.data?.message || "Failed to accept request",
            });
        }
    };

    const handleReject = async (record) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:8080/api/v1/requests/reject",
                {
                    requestId: record.id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            notification.success({
                message: "Success",
                description: "Request rejected successfully",
            });
            fetchRequests(pagination.current, pagination.pageSize);
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.response?.data?.message || "Failed to reject request",
            });
        }
    };

    return (
        <Layout title="Finance">
            <div className={styles.container}>
                <h1>EXPENSE MANAGEMENT SYSTEM (EMS)</h1>
                <i>Hi Finance Department, Let approve expense requests!</i>
                <h3>Expense Requests</h3>
                <Table
                    columns={columns}
                    dataSource={requests}
                    loading={loading}
                    pagination={{
                        ...pagination,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Total ${total} items`,
                    }}
                    onChange={handleTableChange}
                />
            </div>
        </Layout>
    );
}

export default RequestHistory;
