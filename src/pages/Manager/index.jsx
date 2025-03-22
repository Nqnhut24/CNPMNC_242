import React, { useState } from "react";
import styles from "./style.module.css";
import { Button, Modal, Space, Table, Tag } from "antd";

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
            title: "Reasson",
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
                        style={{ color: "blue" }}
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
            key: "1",
            id: "TT0531",
            name: "Mai Lâm",
            reason: "Travel",
            status: "Pending",
            time: "23-02-2025 12:42:12",
            amount: 4890000,
            tags: ["HR"],
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
        <div className={styles.container}>
            <h1>EXPENSE MANAGEMENT SYSTEM (EMS)</h1>
            <i>Hi Finance Department, Let approve expense request!</i>
            <h3>Expense Request</h3>
            <Table
                columns={columns}
                dataSource={data}
            />
        </div>
    );
}

export default Finance;
