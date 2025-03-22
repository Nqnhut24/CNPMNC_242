import React from 'react';
 import { Button, Form, Input, Card, Typography } from 'antd';
 
 const { Title } = Typography;
 
 const App = () => {
   const [form] = Form.useForm();
 
   const onFinish = (values) => {
     console.log('Success:', values);
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
           onFinish={onFinish}
           layout="vertical"
           requiredMark={false}
         >
            <Form.Item
             name="username"
             label="User Name"
             rules={[
               {
                 required: true,
                 message: 'Please input your user name',
               },
             ]}
           >
             <Input size="large" placeholder="Enter your user name" />
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
             ]}
           >
             <Input.Password size="large" placeholder="Enter your password" />
           </Form.Item>
           <Form.Item>
             <Button type="primary" htmlType="submit" size="large" block>
               Login
             </Button>
           </Form.Item>
         </Form>
       </Card>
     </div>
   );
 };
 
 export default App;