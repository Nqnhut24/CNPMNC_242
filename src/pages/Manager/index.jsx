import { Button, Space, Table, Tag, notification, Modal, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import Layout from "../../layout/layout";
import axios from "axios";

function Manager() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);
    const expenseType = ["Office Rent", "Salary", "Office Supplies", "Marketing", "Meeting"];

    const fetchRequests = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:8080/api/v1/requests/employee?currentPage=${page}&pageSize=${pageSize}&sortBy=id&ascending=true`,
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
                    stt: item.id,
                    description: item.description,
                    status: item.statusEnum,
                    amount: item.expense,
                    time: new Date(item.createdAt).toLocaleString(),
                    expenseType: item.expenseType,
                    tags: [item.expenseType],
                    name: item.name || "N/A",
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
        const storedUserName = localStorage.getItem("userName");

        if (!token) {
            navigate("/login");
            return;
        }

        if (userRole !== "EMPLOYEE") {
            notification.error({
                message: "Access Denied",
                description: "Only employees can access this page",
            });
            navigate("/login");
            return;
        }

        setUserName(storedUserName || "Employee");
        fetchRequests();
    }, [navigate]);

    const handleUpdate = async (values) => {
        try {
            const token = localStorage.getItem("token");
            // Use the request ID in the URL
            const response = await axios.put(
                `http://localhost:8080/api/v1/requests/${editingRequest.stt}`,
                {
                    name: values.name,
                    expense: Number(values.expense),
                    expenseType: values.expenseType,
                    description: values.description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (response.data.isSuccess) {
                notification.success({
                    message: "Success",
                    description: "Request updated successfully!",
                });
                setIsModalOpen(false);
                fetchRequests(pagination.current, pagination.pageSize);
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.response?.data?.message || "Failed to update request",
            });
        }
    };

    const handleDelete = async (record) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:8080/api/v1/requests/${record.stt}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.isSuccess) {
                notification.success({
                    message: "Success",
                    description: "Request deleted successfully!",
                });
                fetchRequests(pagination.current, pagination.pageSize);
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.response?.data?.message || "Failed to delete request",
            });
        }
    };

    const UpdateModal = () => {
        const [form, setForm] = useState({
            name: editingRequest?.name || "",
            expense: editingRequest?.amount || "",
            expenseType: editingRequest?.expenseType || "",
            description: editingRequest?.description || "",
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleSelectChange = (value) => {
            setForm((prev) => ({
                ...prev,
                expenseType: value,
            }));
        };

        return (
            <Modal
                title="Update Expense Request"
                open={isModalOpen}
                onOk={() => handleUpdate(form)}
                onCancel={() => setIsModalOpen(false)}
                width={600}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <Input
                        name="name"
                        placeholder="Request Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <Select
                        value={form.expenseType}
                        onChange={handleSelectChange}
                        placeholder="Select Expense Type"
                        style={{ width: "100%" }}
                    >
                        {expenseType.map((type) => (
                            <Select.Option
                                key={type}
                                value={type}
                            >
                                {type}
                            </Select.Option>
                        ))}
                    </Select>

                    <Input
                        type="number"
                        name="expense"
                        placeholder="Amount"
                        value={form.expense}
                        onChange={handleChange}
                    />

                    <Input.TextArea
                        name="description"
                        value={form.description}
                        placeholder="Reason for expense"
                        onChange={handleChange}
                        rows={4}
                    />
                </div>
            </Modal>
        );
    };

    const handleTableChange = (newPagination, filters, sorter) => {
        fetchRequests(newPagination.current, newPagination.pageSize);
    };

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
            render: (amount) => `${amount.toLocaleString()} VND`,
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
                        let color = "geekblue";
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
                        onClick={() => {
                            setEditingRequest(record);
                            setIsModalOpen(true);
                        }}
                        disabled={record.status !== "PENDING"}
                    >
                        Update
                    </Button>
                    <Button
                        danger
                        onClick={() => handleDelete(record)}
                        disabled={record.status !== "PENDING"}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Layout title="Request History">
            <div className={styles.container}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <div>
                        <h1>EXPENSE MANAGEMENT SYSTEM (EMS)</h1>
                        <i>Hi {userName}, here are your requests!</i>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                    <Button
                        type="primary"
                        onClick={() => navigate("/request")}
                        size="large"
                    >
                        New request
                    </Button>
                </div>
                <h3>Expense Request History</h3>
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
                <UpdateModal />
            </div>
        </Layout>
    );
}

export default Manager;
