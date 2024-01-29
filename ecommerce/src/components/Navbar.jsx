import { IoMdCart } from "react-icons/io";

const Navbar = () => {

    return (
        <>
        <nav> 
            <div className="lg:px-40 px-10 flex justify-between py-[15px] align-middle shadow-lg bg-blue-200 fixed top-0 w-full z-50 ">
                <div className='w-[40%]'>
                    <IoMdCart className='text-2xl text-black font-[500] hover:text-white cursor-pointer'  href="/"/>
                </div>
                <div className='flex justify-between w-[60%]'>
                    <a className="text-black  hover:text-green-500 font-bold" href="/">Home</a>
                    <a className="text-black  hover:text-green-500 " href="/login">Login</a>
                    <a className="text-black  hover:text-green-500" href="/register">Register</a>
                    <a className="text-black  hover:text-green-500" href="/additem">Item</a>
                    <a className="text-black  hover:text-green-500" href="/additem">ItemList</a>
                </div>
            </div>
        </nav>
        </>
    )
}
export default Navbar;