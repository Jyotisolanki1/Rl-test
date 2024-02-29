import React from 'react';
import {BrowserRouter,Route, Routes} from  'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';

export default function App() {
  return (
     <BrowserRouter>
     <ToastContainer />
     <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp />} />
       
        <Route element={<PrivateRoute/>} >
          
        <Route path='/cart' element={<Cart />} />
          
        </Route>
       
       <Route path='/about' element={<About />} />
      </Routes>
     </BrowserRouter>
  )
}
