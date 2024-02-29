// Import createSlice from @reduxjs/toolkit to create Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart slice
const initialState = {
  cardData: [], // Initialize cardData as an empty array
};

// Create cartSlice using createSlice
const cartSlice = createSlice({
  name: 'cart',       // Name of the slice
  initialState,       // Initial state
  reducers: {
    // Reducer for handling adding an item to the cart
    addToCart: (state, action) => {
      const { userId } = action.payload; // Assuming you have userId in the payload

      // Find index of the existing item in the cart based on item ID and user ID
      const existingItemIndex = state.cardData.findIndex(item => item._id === action.payload._id && item.userId === userId);

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, increase its quantity
        state.cardData[existingItemIndex].quantity += 1;
      } else {
        // If the item is not in the cart, add it with quantity 1
        state.cardData.push({ ...action.payload, quantity: 1 });
      }
    },
    
    // Reducer for handling removing an item from the cart
    removeToCart: (state, action) => {
      // Filter out the item with the specified ID from the cart
      state.cardData = state.cardData.filter(item => item._id !== action.payload);
    },
  },
});

// Export actions and reducer from cartSlice
export const {
  addToCart,
  removeToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
