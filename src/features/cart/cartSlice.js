import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { cabin, checkIn, checkOut, guests } = action.payload;
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = checkOutDate - checkInDate;
      const nights = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const totalPrice = cabin.price * nights;
      
      const existingItem = state.items.find(item => item.cabin.id === cabin.id);
      
      if (existingItem) {
        existingItem.checkIn = checkIn;
        existingItem.checkOut = checkOut;
        existingItem.guests = guests;
        existingItem.nights = nights;
        existingItem.totalPrice = totalPrice;
      } else {
        state.items.push({
          cabin,
          checkIn,
          checkOut,
          guests,
          nights,
          totalPrice,
        });
      }
      
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.cabin.id !== action.payload);
      state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalAmount;
export const selectCartItemCount = (state) => state.cart.items.length;

export default cartSlice.reducer;
