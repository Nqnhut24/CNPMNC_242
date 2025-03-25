import React from 'react';
import { Button, Form, Input, Card, Typography, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const App = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const registrationData = {
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
        role: "EMPLOYEE" // Default role
      };

      const response = await axios.post('http://localhost:8080/api/v1/auth/register', registrationData);

      if (response.status === 200 || response.status === 201) {
        notification.success({
          message: 'Registration Successful',
          description: 'Your account has been created successfully!',
        });
        navigate('/login');
      }
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.response?.data?.message || 'Something went wrong during registration.',
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
          <Title level={2}>Register</Title>
        </div>
        
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: 'Please input your full name',
              },
              {
                pattern: /^[a-zA-ZÀ-ỹ\s]*[a-zA-ZÀ-ỹ]+[a-zA-ZÀ-ỹ\s]*$/,
                message: 'Name must contain at least one letter and can only contain letters and spaces',
              }
            ]}
          >
            <Input size="large" placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
              {
                pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
                message: 'Username must start with a letter or underscore and can only contain letters, numbers, and underscores',
              }
            ]}
          >
            <Input size="large" placeholder="Enter your username" />
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
                pattern: /^\S*$/,
                message: 'Password cannot contain spaces',
              }
            ]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Register
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center' }}>
            <Typography.Text>
              Do you have an account? <Typography.Link href="/login">Login</Typography.Link>
            </Typography.Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default App;