import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(e.target);
      const formDataObject = {};

      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      if (formDataObject.password !== formDataObject.confirmPassword) {
        message.error('Passwords do not match');
        return;
      }

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });
      debugger
      
      if (response.status === 400) {
        message.error('username already exist')
      } else if (response.status === 200) {
        message.success('User registered successfully!');
        navigate('/login');
      } else {
        message.error('Error registering user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='topnav mt-14 pt-8 flex justify-center'>
      <form onSubmit={handleSubmit} className='p-5'>
        <div className='flex flex-col text-left py-2'>
          <label className='text-sm font-bold'>username</label>
          <input name="username" className='border-[1px] px-2 py-1' type='text' required placeholder='enter user name' />
        </div>
        <div className='flex flex-col text-left py-2'>
          <label className='text-sm font-bold'>address</label>
          <input name="address" className='border-[1px] px-2 py-1' type='text' required placeholder='enter user name' />
        </div>
        <div className='flex flex-col text-left py-2'>
          <label className='text-sm font-bold'>email</label>
          <input name="email" className='border-[1px] px-2 py-1' type='email' required placeholder='enter user name' />
        </div>
        <div className='flex flex-col text-left py-2'>
          <label className='text-sm font-bold'>phoneNumber</label>
          <input name="phoneNumber" className='border-[1px] px-2 py-1' type='phone' required placeholder='enter user name' />
        </div>
        <div className='flex flex-col text-left py-2'>
          <label className='text-sm font-bold'>password</label>
          <input name="password" className='border-[1px] px-2 py-1' type='password' required placeholder='enter user name' />
        </div>
        <div className='flex flex-col text-left py-2'>
          <label className='text-sm font-bold'>confirmPassword</label>
          <input name="confirmPassword" className='border-[1px] px-2 py-1' type='password' required placeholder='enter user name' />
        </div>
        <button className='py-2 px-4 bg-black text-white hover:bg-green-500 rounded-md text-center'>submit</button>
      </form>
    </div>
  );
};

export default Register;