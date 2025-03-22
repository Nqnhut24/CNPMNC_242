import React, {useEffect, useState} from 'react';
 import { Button, Checkbox, Form, Input, Card, Typography } from 'antd';
 
 const { Title } = Typography;
 
 const App = () => {
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const formTailLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
        offset: 0,
    },
    };
    useEffect(() => {
    form.validateFields(['nickname']);
    }, [checkNick, form]);
    const onCheckboxChange = (e) => {
    setCheckNick(e.target.checked);
    };
    const onCheck = async () => {
    try {
        const values = await form.validateFields();
        console.log('Success:', values);
    } catch (errorInfo) {
        console.log('Failed:', errorInfo);
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
                    message: 'Please input your nickname',
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
           <Form.Item {...formTailLayout}>
                <Checkbox checked={checkNick} onChange={onCheckboxChange}>
                 Username is required
                </Checkbox>
            </Form.Item>
           <Form.Item>
                <Button type="primary" onClick={onCheck}>
                Login
                </Button>
           </Form.Item>
         </Form>
       </Card>
     </div>
   );
};
 
 export default App;