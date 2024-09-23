import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    user: null,
    is_authenticated: false,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    is_authenticated: (state, action) => {
      state.is_authenticated = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const {
  addUser,
  is_authenticated,
  removeUser,
} = userSlice.actions;
export default userSlice.reducer;
