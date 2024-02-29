import React, { useEffect, useState } from 'react';
import { signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from 'react-icons/fa';

export default function Header() {
  // Redux state selectors
  const { currentUser } = useSelector((state) => state.user);
  const { cardData } = useSelector((state) => state.cart);

  // React Router navigation hook
  const navigate = useNavigate();

  // Redux dispatch function
  const dispatch = useDispatch();

  // useEffect to check if user is authenticated, otherwise redirect to home
  useEffect(() =>{
    if(!currentUser){
     navigate('/')
    }
     },[]);

  // Handle signout function
  const handleSignout = async () => {
    try {
      // Dispatch signOutStart action to update state
      dispatch(signOutStart());

      // Call signout API endpoint
      const res = await fetch('http://localhost:3000/api/auth/signout', {
        method: 'GET',
        credentials: 'include',
      });

      // Parse response data
      const data = await res.json();

      // Check if signout was successful
      if (data.success === false) {
        // Dispatch signOutFailure action with error message
        dispatch(signOutFailure(data.message));
        return;
      }

      // Dispatch signOutSuccess action with response data
      dispatch(signOutSuccess(data));

      // Redirect to home after successful signout
      navigate('/');
    } catch (error) {
      // Dispatch signOutFailure action if an error occurs
      dispatch(signOutFailure(error.message));
    }
  };

  // Filter card data based on the current user
  if (currentUser) {
    var filteredCardData = cardData.filter((item) => item.userId === currentUser._id);
  }

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        {/* Product Card logo with navigation to home */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Product</span>
            <span className="text-slate-700">Cart</span>
          </h1>
        </Link>

        {/* Navigation links */}
        <ul className="flex gap-4">
          {/* Home link */}
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          {/* About link */}
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          {/* Cart link with item count */}
          <Link to="/cart">
            <div className="flex">
              <FaCartArrowDown />
              <p className="bg-red-500 text-white rounded-3xl mb-3">
                {currentUser && filteredCardData.length}
              </p>
            </div>
          </Link>

          {/* Conditional rendering of SignOut or SignIn link */}
          {currentUser ? (
            <li className="hidden sm:inline text-red-700 hover:underline" onClick={handleSignout}>
              SignOut
            </li>
          ) : (
            <Link to="/sign-in">
              <li className="hidden sm:inline text-slate-700 hover:underline">SignIn</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
