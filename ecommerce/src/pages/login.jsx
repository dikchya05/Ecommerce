import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('login successfull!');
        navigate('/additem')
        // dispatch(setUserDetails(response?.data))
      } else {
        message.error('login unsuccessful')
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='topnav mt-14 pt-8 flex justify-center'>
      <div className='w-[50%]'>
        <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} style={{ maxWidth: 600, }} initialValues={{ remember: true, }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!', },]} >
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16, }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16, }}
          >
            <Button type="primary" htmlType="submit" className='!bg-blue-500'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>


  );
}


export default Login;