// src/redux/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    coordinates: { lon: 0, lat: 0 },
    hamburgerOpen: false,
    sourceMapboxId: "",
    destinationMapboxId: "",
    sourceCoordinates: null,
    destinationCoordinates: null,
    plot: false,
    authenticated: false,
    distance: -1,
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    setHamburgerOpen: (state, action) => {
      state.hamburgerOpen = action.payload;
    },
    setSourceMapboxId: (state, action) => {
      state.sourceMapboxId = action.payload;
    },
    setDestinationMapboxId: (state, action) => {
      state.destinationMapboxId = action.payload;
    },
    setSourceCoordinates: (state, action) => {
      state.sourceCoordinates = action.payload;
    },
    setDestinationCoordinates: (state, action) => {
      state.destinationCoordinates = action.payload;
    },
    setPlot: (state, action) => {
      state.plot = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
  },
});

export const {
  setCoordinates,
  setHamburgerOpen,
  setSourceMapboxId,
  setDestinationMapboxId,
  setSourceCoordinates,
  setDestinationCoordinates,
  setPlot,
  setAuthenticated,
  setDistance,
} = locationSlice.actions;

export default locationSlice.reducer;
