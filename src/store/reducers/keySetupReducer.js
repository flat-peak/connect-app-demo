import { createSlice } from "@reduxjs/toolkit";
import { service } from "../../service/flatpeak.service";

export const keySetupSlice = createSlice({
  name: "keySetup",
  initialState: {
    apiUrl: service._host,
    publishableKey: service._publishableKey,
  },
  reducers: {
    setApiUrl: (state, action) => {
      state.apiUrl = action.payload;
      service._host = action.payload;
    },
    setPublishableKey: (state, action) => {
      state.publishableKey = action.payload;
      service._publishableKey = action.payload;
    },
  },
});

export const { setApiUrl, setPublishableKey } = keySetupSlice.actions;

export const selectApiUrl = (state) => state.keySetup.apiUrl;
export const selectPublishableKey = (state) => state.keySetup.publishableKey;
export const selectDashboardUrl = (state) =>
  state.keySetup.apiUrl.replace(
    "api.flatpeak.energy",
    "dashboard.flatpeak.energy"
  );

export default keySetupSlice.reducer;
