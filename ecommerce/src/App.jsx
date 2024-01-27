import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Layout from './Layout'
import Register from './pages/register'
import AddItem from './pages/additem'
import ListOfItem from './pages/additem'

function App() {

  return (
    <>
      <div>
        <BrowserRouter basename='/'>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path= "/register" element= {<Register/>}/>
              <Route path = "/additem" element={<AddItem/>}/>
              <Route path = "/listofitem" element = {<ListOfItem/>}/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
