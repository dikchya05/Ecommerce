import React, { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';

// const SubmitButton = ({ form }) => {
//   const [submittable, setSubmittable] = React.useState(false);

//   // Watch all names
//   const values = Form.useWatch([], form);
//   React.useEffect(() => {
//     form
//       .validateFields({
//         validateOnly: true,
//       })
//       .then(
//         () => {
//           setSubmittable(true);
//         },
//         () => {
//           setSubmittable(false);
//         },
//       );
//   }, [values]);
// };



const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",

  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log("bshjkgfshjkdgfskjdgs", formData)

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(e.target);
      const formDataObject = {};

      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Now formDataObject contains the form data
      console.log(formDataObject);

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObject),
      });

      if (response.ok) {
        console.log('User registered successfully!');
      } else {
        console.error('Error registering user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const [form] = Form.useForm();
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