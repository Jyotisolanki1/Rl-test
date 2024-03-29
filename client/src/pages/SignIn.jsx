import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux'; 
import { signInFailure,signInSuccess,signInStart } from '../redux/user/userSlice';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [formData, setFormData] = useState({}); 
  const {error,loading} = useSelector((state)=> state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

 const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    dispatch(signInStart());

    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),  
      credentials: "include" 
    });
    
     const data = await res.json();
     if(data.success === false){
      dispatch(signInFailure(data.message))
      return
     }
     toast.success("user sign in successfully")
   dispatch(signInSuccess(data))
    navigate('/')
  } catch (error) {
   dispatch(signInFailure(error.message))
  }
 }
 

  return (
    <div className='max-w-lg p-3 mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

     <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      
       <input type='email' placeholder='enter your email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
       <input type='password' placeholder='enter your password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
       <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?"loading..":"Sign In"}</button>
   
       </form>
     
     <div className='flex gap-2 mt-5'>
       <p>Don't have an account?</p>
       <Link to='/sign-up'>
        <span className='text-blue-700'>Sign Up</span>
       </Link>
     </div>
     {error? <p className='text-red-500 mt-5'>{error}</p>: null}
    </div>
  )
}
