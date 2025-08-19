import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(
        (booking) => booking.id === action.payload.id
      );

      if (index >= 0) {
        state.bookings[index] = { ...state.bookings[index], ...action.payload };
      }
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
  },
});

export const { setBookings, addBooking, removeBooking, updateBooking } = bookingSlice.actions;
export default bookingSlice.reducer;