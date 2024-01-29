import { message } from 'antd';
import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import img1 from '../assets/e.jpg';
import img2 from '../assets/aa.jpg';
import img3 from '../assets/v.jpg';

const AddItem = () => {
  const navigate = useNavigate();

  const orderItem = async (values) => { 
    try {
      const response = await fetch('http://localhost:5000/additem', {
        headers: { 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        message.success("Item added successfully");
        navigate('/listofitem')
        console.log(response);
      } else {
        message.error('Failed to add item');
      }
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <>
      <div className='form'>
        <Formik
          initialValues={{
            category_name: '',
            price: '',
            description: ''
          }}
          // validationSchema={itemsSchema}
          onSubmit={values => {
            orderItem(values);
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field name="category_name" placeholder="Category Name" />
              {errors.category_name && touched.category_name ? (<div className="error">{errors.category_name}</div>) : null}
              <Field name="price" placeholder="Price" />
              {errors.price && touched.price ? (<div className="error">{errors.price}</div>) : null}
              <Field name="description" placeholder="Description" />
              {errors.description && touched.description ? (<div className="error">{errors.description}</div>) : null}
              <button type="submit">Add</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddItem;
