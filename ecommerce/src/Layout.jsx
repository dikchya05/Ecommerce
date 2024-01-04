import Navbar from "./components/Navbar";

const Layout = ({ children }) => {

  return (
    <>
      <Navbar />
      <div className={`bg-white  `} >
        {children}
      </div>
    </>
  );
}

export default Layout;