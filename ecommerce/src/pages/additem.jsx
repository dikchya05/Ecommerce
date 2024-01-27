
import { message } from 'antd';
import React from 'react';
import img1 from '../assets/e.jpg'
import img2 from '../assets/aa.jpg'
import img3 from '../assets/v.jpg'



// const data = [
//   { name: '', url: img1 },
//   { name: '', url: img2 },
//   { name: '', url: img3 },
// ];


const AddItem = () => {
  const item = async (e) => {
    e.preventDefault(); 
    try {
      const form = e.target;
      const formData = new FormData(form);
      const response = await fetch('http://localhost:5000/additem', {
        method: 'POST',
        body: formData,
      });
      console.log(formData)
      debugger

      if (response.status === 200) {
        message.success("Item added successfully");
      } else {
        message.error('Failed to add item');
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
   
    <>
     <div className='topnav mt-14 pt-8 flex justify-center'>
     <form onSubmit= {item} className='p-5'>
          <div className='flex flex-col text-left py-2'>
          <label className='text-sm  font-bold'>Category Name</label>
          <input name="category_name" className='border-[1px] px-2 py-1 my-1' type='text' />
        </div>
        <div className='flex flex-col text-left py-2 my-'>
          <label className='text-sm  font-bold'>Price</label>
          <input name="price" className='border-[1px] px-2 py-1 my-1 ' type='number' />
        </div>
        <div className='flex flex-col text-left py-2 my-'>
          <label className='text-sm  font-bold'>Description</label>
          <input name="description" className='border-[1px] px-2 py-1 my-1 ' type='text' />
        </div>
        <button className='py-2 px-4 bg-black text-white hover:bg-green-500 rounded-md text-center'>Add</button>
        </form>
     
        
    </div>
    
      {/* <List
        header={<div>Item List</div>}z
        bordered dataSource={data} renderItem={item => (
          <List.Item>
            <img src={item.url} alt={item.name}  style={{ width: '200px', height: '100px', marginRight: '20px', marginTop: '20px' }}  />
            {item.name}
            <Flex wrap="wrap" gap="small">
                <Button type="primary" className='mt-10' danger> Add to cart</Button>
            </Flex>

          </List.Item>
          
        )}
      /> */}
    
      
    </>

  );

};

export default AddItem;