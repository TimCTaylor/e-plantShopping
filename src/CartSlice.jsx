import { createSlice } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names

      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If item already exists in the cart, decrease its quantity
        existingItem.quantity--;
        // If the quantity becomes 0, remove the item from the cart
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item.name !== name);
        }

        // Note on Javascript.
        // The pattern above using filter() is a common way to remove an item from an array in JavaScript. Filter() is a Javascript method.
        // It works by:
        // Creating a new array.
        // Iterating through the existing array (state.items) and adding to the new array  only those items that match the criteria
        // (in this case, that the item doesn't match the specified name).
        // Then we assign the resulting array back to state.items.
        // React is big on immutability. And here we do not change the original state.items array. Instead, we create 
        // a new array and point/ assign the array variable to it.
      } 
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
      // Find the item in the cart that matches the given name

      // JavaScript note#1: find() is a JavaScript array method that returns the first element in an array that satisfies 
      // a provided testing function.

      // JavaScript Note#2:
      // The  test function provided to find() uses the arrow function syntax for an inline/ anonymous function.
      // It means: "take item as an input and return whether the item matches the condition (item.name === name)".

      // JavaScript Note#3:
      // The arrow function is an example of a "callback function", which is a function passed into another function as an
      // argument. The 'controlling function' (my term) decides when to call it. The IBM course talks endlessly about
      // callback functions, so that's a term I need to know!
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
