import { createSlice } from "@reduxjs/toolkit";
import { saveConnectedTariff, saveManualTariff } from "./tariffReducer";

export const outputDataSlice = createSlice({
  name: "outputData",
  initialState: /** @type {App.OutputState} */ {
    device_id: "",
    customer_id: "",
    product_id: "",
    tariff_id: "",
    confirmed: false,
  },
  reducers: {
    setOutputData: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveManualTariff.fulfilled, (state, action) => {
      const { device_id, customer_id, product_id, tariff_id } = action.payload;
      state.device_id = device_id;
      state.customer_id = customer_id;
      state.product_id = product_id;
      state.tariff_id = tariff_id;
    });
    builder.addCase(saveConnectedTariff.fulfilled, (state, action) => {
      const { device_id, customer_id, product_id, tariff_id } = action.payload;
      state.device_id = device_id;
      state.customer_id = customer_id;
      state.product_id = product_id;
      state.tariff_id = tariff_id;
    });
  },
});

export const { setOutputData } = outputDataSlice.actions;

export const selectDeviceId = (state) => state.outputData.device_id;
export const selectCustomerId = (state) => state.outputData.customer_id;
export const selectProductId = (state) => state.outputData.product_id;
export const selectTariffId = (state) => state.outputData.tariff_id;
export const selectConfirmed = (state) => state.outputData.confirmed;

export default outputDataSlice.reducer;
