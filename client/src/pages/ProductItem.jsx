import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import { addToCart } from '../redux/user/cartSlice'; // Import your addToCart action

export default function ProductItem({ Product }) {

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddToCart = () => {  // Dispatch the addToCart action with the product data
    dispatch(addToCart({...Product,userId:currentUser._id}));
  };

  return (
    <main className='border'>
      {Product && (
        <div>
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {Product.Name} <br/> Price {Product.Price}
            </p>
            {currentUser ? (
              <button
                onClick={handleAddToCart} // Call the function when the button is clicked
                className='bg-blue-700 text-white rounded-lg uppercase hover:opacity-95 p-3'                
              >
                Add To Cart
              </button>
            ) : (
              <p className='text-red-500'>Please log in to add to cart.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
