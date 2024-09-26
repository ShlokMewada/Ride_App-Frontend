import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    isAuthenticated: null,
    rideBooked: false,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    addIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    removeIsAuthenticated: (state) => {
      state.isAuthenticated = null;
    },
    setRideBooked: (state, action) => {
      state.rideBooked = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  addIsAuthenticated,
  removeIsAuthenticated,
  setRideBooked,
} = userSlice.actions;
export default userSlice.reducer;
