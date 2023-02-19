import { createSlice } from "@reduxjs/toolkit";
import { service } from "../../service/flatpeak.service";
import { Actions } from "../sagas/actions";

export const keySetupSlice = createSlice({
  name: "keySetup",
  initialState: {
    apiUrl: "https://api.flatpeak.energy",
    publishableKey: "",
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

export const checkApiCredentials = (payload) => {
  return {
    type: Actions.checkApiCredentials,
    payload: payload,
  };
};

export const selectApiUrl = (state) => state.keySetup.apiUrl;
export const selectPublishableKey = (state) => state.keySetup.publishableKey;

export default keySetupSlice.reducer;
