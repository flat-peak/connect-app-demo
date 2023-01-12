import { createSlice } from "@reduxjs/toolkit";
import { Actions } from "../sagas/actions";

export const providerSelectionSlice = createSlice({
  name: "providerSelection",
  initialState: {
    loading: false,
    providers: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProviders: (state, action) => {
      state.providers = action.payload;
    },
  },
});

export const { setLoading, setProviders } = providerSelectionSlice.actions;

export const fetchProviderList = (payload) => {
  return {
    type: Actions.fetchProviderList,
    payload: payload,
  };
};

export const connectTariff = (payload) => {
  return {
    type: Actions.connectTariff,
    payload: payload,
  };
};

export const selectLoading = (state) => state.providerSelection.loading;
export const selectProviders = (state) => state.providerSelection.providers;

export default providerSelectionSlice.reducer;
