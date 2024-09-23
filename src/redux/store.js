import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import locationReducer from "./locationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer
  },
});

export default store;
