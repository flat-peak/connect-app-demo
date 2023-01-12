import { createSlice } from "@reduxjs/toolkit";

export const contextSlice = createSlice({
  name: "context",
  initialState: {
    offPeakCharge: false,
    developerMode: false,
    areaEnabled: [],
  },
  reducers: {
    setDeveloperMode: (state, action) => {
      state.developerMode = action.payload;
    },
    setOffPeakCharge: (state, action) => {
      state.offPeakCharge = action.payload;
    },
    setAreaEnabled: (state, action) => {
      console.log("setAreaEnabled", action.payload);

      state.areaEnabled = action.payload;
    },
  },
});

export const { setOffPeakCharge, setDeveloperMode, setAreaEnabled } =
  contextSlice.actions;

export const selectOffPeakCharge = (state) => state.context.offPeakCharge;
export const selectDeveloperMode = (state) => state.context.developerMode;
export const selectAreaEnabled = (state) => state.context.areaEnabled;

export default contextSlice.reducer;
