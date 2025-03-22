// import React, { useEffect, useState } from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// import "./style.module.css";
// const formItemLayout = {
//   labelCol: {
//     span: 4,
//   },
//   wrapperCol: {
//     span: 8,
//   },
// };
// const formTailLayout = {
//   labelCol: {
//     span: 4,
//   },
//   wrapperCol: {
//     span: 8,
//     offset: 4,
//   },
// };
// const App = () => {
//   const [form] = Form.useForm();
//   const [checkNick, setCheckNick] = useState(false);
//   useEffect(() => {
//     form.validateFields(['nickname']);
//   }, [checkNick, form]);
//   const onCheckboxChange = (e) => {
//     setCheckNick(e.target.checked);
//   };
//   const onCheck = async () => {
//     try {
//       const values = await form.validateFields();
//       console.log('Success:', values);
//     } catch (errorInfo) {
//       console.log('Failed:', errorInfo);
//     }
//   };
//   return (
//     <div className="body" 
//         style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//             width: '100vw',
//             backgroundColor: '#f0f2f5',
//         }}>
        
//         <Form
//         form={form}
//         name="dynamic_rule"
//         style={{
            
//             width: '600px',
//         }}
//         >
//         <Form.Item
//             {...formItemLayout}
//             name="username"
//             label="User Name"
//             rules={[
//             {
//                 required: true,
//                 message: 'Please input your name',
//             },
//             ]}
//         >
//             <Input placeholder="Please input your user name" />
//         </Form.Item>
//         <Form.Item
//             {...formItemLayout}
//             name="nickname"
//             label="Password"
//             rules={[
//             {
//                 required: checkNick,
//                 message: 'Please input your nickname',
//             },
//             ]}
//         >
//             <Input placeholder="Please input your password" />
//         </Form.Item>
//         <Form.Item {...formTailLayout}>
//             <Checkbox checked={checkNick} onChange={onCheckboxChange}>
//             Password is required
//             </Checkbox>
//         </Form.Item>
//         <Form.Item {...formTailLayout}>
//             <Button type="primary" onClick={onCheck}>
//             Login
//             </Button>
//         </Form.Item>
//         </Form>
//     </div>
    
//   );
// };
// export default App;


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