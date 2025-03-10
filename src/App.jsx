import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home/Home'
import OrderDetails from './OrderPage/index'
import './index.css';


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/order' element={<OrderDetails/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App