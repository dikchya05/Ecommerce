import { List, Button, Flex } from 'antd';
import img1 from '../assets/e.jpg'
import img2 from '../assets/aa.jpg'
import img3 from '../assets/v.jpg'



const data = [
  { name: '', url: img1 },
  { name: '', url: img2 },
  { name: '', url: img3 },
];


const ListOfItem = () => {
  return (
    <>
    
      <List
        header={<div>Item List</div>}
        bordered dataSource={data} renderItem={item => (
          <List.Item>
            <img src={item.url} alt={item.name}  style={{ width: '200px', height: '100px', marginRight: '20px', marginTop: '20px' }}  />
            {item.name}
            <Flex wrap="wrap" gap="small">
                <Button type="primary" className='mt-10' danger> Add to cart</Button>
            </Flex>

          </List.Item>
          
        )}
      />
    
      
    </>

  )

}

export default ListOfItem;