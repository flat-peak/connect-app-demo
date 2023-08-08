import { createSlice } from "@reduxjs/toolkit";
import { flatpeak } from "../../service/flatpeak.service";

export const keySetupSlice = createSlice({
  name: "keySetup",
  initialState: {
    apiUrl: flatpeak.getHost(),
    publishableKey: flatpeak.getPublishableKey(),
  },
  reducers: {
    setApiUrl: (state, action) => {
      state.apiUrl = action.payload;
      flatpeak.setHost(action.payload);
    },
    setPublishableKey: (state, action) => {
      state.publishableKey = action.payload;
      flatpeak.setPublishableKey(action.payload);
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
