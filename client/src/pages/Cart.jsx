import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeToCart } from '../redux/user/cartSlice';
import { toast } from 'react-toastify';

export default function Cart() {
  // Retrieve cartData and currentUser from Redux state
  const { cardData } = useSelector(state => state.cart);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // Function to handle removal of an item from the cart
  const removeItem = async (id) => {
    try {
      // Dispatch the removeToCart action to remove the item from the cart
      const data = await dispatch(removeToCart(id));

      // If removal is successful, show a success toast
      if (data) {
        toast.success('Removed Product successfully!');
      }
    } catch (error) {
      // Handle any errors that may occur during the removal process
      console.error('Error removing product:', error.message);
      toast.error('Error removing product. Please try again.');
    }
  };

  // Filter the cardData based on the current user's ID
  const filteredCardData = cardData.filter(item => item.userId === currentUser._id);

  // Calculate the grand total of the items in the cart
  const grandTotal = cardData.reduce((total, item) => {
    return total + item.Price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {filteredCardData.length === 0 ? (
        // Display a message if the cart is empty
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        // Render the cart table if there are items in the cart
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Total</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCardData.map((item, index) => (
              // Render each item in the cart
              <tr key={index} className="bg-white">
                <td className="py-2 px-4 border">{item.Name}</td>
                <td className="py-2 px-4 border">{item.Price.toFixed(2)} ₹</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className="py-2 px-4 border">{(item.Price * item.quantity).toFixed(2)} ₹</td>
                <td
                  onClick={() => removeItem(item._id)}
                  className="py-2 px-4 border cursor-pointer text-red-500 hover:text-red-700"
                >
                  Remove
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {/* Display the grand total in the footer */}
            <tr className="bg-gray-100">
              <td colSpan="3" className="py-2 px-4 border font-semibold text-right">Grand Total:</td>
              <td className="py-2 px-4 border">{grandTotal.toFixed(2)} ₹/- Only</td>
              <td className="py-2 px-4 border"></td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
