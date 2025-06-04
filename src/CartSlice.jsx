import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        // Check if the item already exists in the cart
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            // If it exists, update the quantity
            existingItem.quantity += 1;
        } else {
            // If it doesn't exist, add a new item with quantity 1
            state.items.push({ name, image, cost, quantity: 1 });
        }
    },

    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const item = state.items.find(item => item.name === name);
        if (item) {
            // Ensure quantity does not go below 1
            item.quantity = Math.max(1, quantity);
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
