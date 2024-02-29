// Import createSlice from @reduxjs/toolkit to create Redux slice
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  currentUser: null,  // Current authenticated user
  error: null,        // Any error that occurs during sign-in or sign-out
  loading: false,     // Loading state to indicate ongoing asynchronous operations
};

// Create userSlice using createSlice
const userSlice = createSlice({
  name: 'user',       // Name of the slice
  initialState,       // Initial state
  reducers: {
    // Reducer for handling sign-in start action
    signInStart: (state) => {
      state.loading = true;  // Set loading to true when sign-in process starts
    },
    // Reducer for handling sign-in success action
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;  // Set current user on successful sign-in
      state.loading = false;  // Set loading to false
      state.error = null;    // Clear any previous errors
    },
    // Reducer for handling sign-in failure action
    signInFailure: (state, action) => {
      state.error = action.payload;  // Set error message on sign-in failure
      state.loading = false;        // Set loading to false
    },
    // Reducer for handling sign-out start action
    signOutStart: (state) => {
      state.loading = true;  // Set loading to true when sign-out process starts
    },
    // Reducer for handling sign-out success action
    signOutSuccess: (state) => {
      state.currentUser = null;  // Clear current user on successful sign-out
      state.loading = false;     // Set loading to false
      state.error = null;        // Clear any previous errors
    },
    // Reducer for handling sign-out failure action
    signOutFailure: (state, action) => {
      state.error = action.payload;  // Set error message on sign-out failure
      state.loading = false;        // Set loading to false
    },
  },
});

// Export actions and reducer from userSlice
export const {
  signInStart,
  signInFailure,
  signInSuccess,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
