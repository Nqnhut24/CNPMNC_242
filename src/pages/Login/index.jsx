import React, {useEffect, useState} from 'react';
import { Button, Checkbox, Form, Input, Card, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const App = () => {
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const navigate = useNavigate();

    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16, offset: 0 },
    };

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    const onCheckboxChange = (e) => {
        setCheckNick(e.target.checked);
    };

    const handleLogin = async () => {
        try {
            const values = await form.validateFields();
            const loginData = {
                email: values.username,
                password: values.password
            };

            const response = await axios.post('http://localhost:8080/api/v1/auth/login', loginData);

            if (response.status === 200) {
                // Save token and email to localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userEmail', values.username);
                
                notification.success({
                    message: 'Login Successful',
                    description: 'Welcome back!',
                });
                navigate('/request');
            }
        } catch (error) {
            notification.error({
                message: 'Login Failed',
                description: error.response?.data?.message || 'Invalid email or password.',
            });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f0f2f5'
        }}>
            <Card
                style={{
                    width: 450,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={2}>Login</Title>
                </div>
                
                <Form
                    form={form}
                    name="register"
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="username"
                        label="User Name"
                        rules={[
                            {
                                required: checkNick,
                                message: 'Please input your email',
                            },
                            {
                                type: 'email',
                                message: 'Username must be a valid email address',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters',
                            },
                            {
                                pattern: /^\S+$/,
                                message: 'Password must not contain spaces',
                            },
                        ]}
                    >
                        <Input.Password size="large" placeholder="Enter your password" />
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <Checkbox checked={checkNick} onChange={onCheckboxChange}>
                            Username is required
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <p style={{ textAlign: 'center' }}>
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default App;