import { createSlice } from "@reduxjs/toolkit";
import { COUNTRY_CODES } from "../../data/tariff-constants";

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
      state.areaEnabled = action.payload.sort((entryA, entryB) => {
        const countryA = COUNTRY_CODES[entryA.country_code];
        const countryB = COUNTRY_CODES[entryB.country_code];
        return countryA.localeCompare(countryB);
      });
    },
  },
});

export const { setOffPeakCharge, setDeveloperMode, setAreaEnabled } =
  contextSlice.actions;

export const selectOffPeakCharge = (state) => state.context.offPeakCharge;
export const selectDeveloperMode = (state) => state.context.developerMode;
export const selectAreaEnabled = (state) => state.context.areaEnabled;

export default contextSlice.reducer;
