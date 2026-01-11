import { configureStore } from '@reduxjs/toolkit';
import cabinsReducer from '../features/cabins/cabinsSlice';
import cartReducer from '../features/cart/cartSlice';
import bookingsReducer from '../features/bookings/bookingsSlice';

export const store = configureStore({
  reducer: {
    cabins: cabinsReducer,
    cart: cartReducer,
    bookings: bookingsReducer,
  },
});
