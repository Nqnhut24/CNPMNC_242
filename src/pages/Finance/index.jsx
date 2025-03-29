import React, { useState } from "react";
import { Button, Modal, notification, Space, Table, Tag } from "antd";
import Layout from "../../layout/layout";
import styles from "./style.module.css";
import axios from "axios";

function Finance() {
    const columns = [
        {
            title: "Employee ID",
            dataIndex: "id",
            key: "id",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Department",
            key: "department",
            dataIndex: "department",
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
            title: "Member",
            key: "member",
            render: (_, record) => (
                <>
                    <p
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => showModal()}
                    >
                        View
                    </p>
                    <Modal
                        title="Trip's members"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        2212481 - Nguyễn Quốc Nhựt (IT)
                    </Modal>
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
                    <Button type="primary">Accept</Button>
                    <Button danger>Reject</Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: "1",
            id: "TT0531",
            name: "Mai Lâm",
            reason: "Travel",
            status: "Pending",
            amount: 4890000,
            time: "23-02-2025 12:42:12",
            tags: ["HR"],
        },
        {
            key: "2",
            id: "TT0532",
            name: "Nguyễn Văn A",
            reason: "Office Supplies",
            status: "Approved",
            amount: 1500000,
            time: "22-02-2025 10:30:00",
            tags: ["Finance"],
        },
        {
            key: "3",
            id: "TT0533",
            name: "Trần Thị B",
            reason: "Marketing",
            status: "Rejected",
            amount: 2000000,
            time: "21-02-2025 09:15:00",
            tags: ["Marketing"],
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout title="Finance Management">
            <div className={styles.container}>
                <i>Hi Manager, Let approve expense requests!</i>
                <h3>Expense Request</h3>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </Layout>
    );
}

export default Finance;
