import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  selectedMarker: null,
  selectedPaymentMethod: null,
  selectedParkingTime: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    setSelectedParkingTime: (state, action) => {
      state.selectedParkingTime = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setSelectedMarker,
  setSelectedPaymentMethod,
  setSelectedParkingTime,
} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectSelectedMarker = (state) => state.nav.selectedMarker;
export const selectSelectedPaymentMethod = (state) =>
  state.nav.selectedPaymentMethod;
export const selectSelectedParkingTime = (state) =>
  state.nav.selectedParkingTime;

export default navSlice.reducer;
