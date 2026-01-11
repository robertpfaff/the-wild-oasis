import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  currentBooking: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    createBooking: (state, action) => {
      const booking = {
        id: Date.now(),
        ...action.payload,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      state.bookings.push(booking);
      state.currentBooking = booking;
    },
    cancelBooking: (state, action) => {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
  },
});

export const { createBooking, cancelBooking, clearCurrentBooking } = bookingsSlice.actions;

export const selectAllBookings = (state) => state.bookings.bookings;
export const selectCurrentBooking = (state) => state.bookings.currentBooking;

export default bookingsSlice.reducer;
