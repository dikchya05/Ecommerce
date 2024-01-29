const listOfItem = async() =>{
    try{
        const response = await fetch('http://localhost:5000/listofitem',{
        headers: { 'Content-Type': 'application/json'},
        method: 'GET',
        body: JSON.stringify(),
        })

    }catch (error){
        console.error(error)

    }



    return(
        <>
    <div className="text-lg font-semibold list-disc pl-4">
        <div className="col-md-3">
         <h1 className='title'> Item</h1>
       
          <li> {category_name}</li>
          <li> {price}</li>  
          <li> {description}</li>    
        
    </div>
    </div>
    </>
    )
    
}
export default listOfItem