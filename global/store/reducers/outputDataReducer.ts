import { createSlice } from "@reduxjs/toolkit";

export const outputDataSlice = createSlice({
  name: "outputData",
  initialState: {
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
});

export const { setOutputData } = outputDataSlice.actions;

export const selectDeviceId = (state) => state.outputData.device_id;
export const selectCustomerId = (state) => state.outputData.customer_id;
export const selectProductId = (state) => state.outputData.product_id;
export const selectTariffId = (state) => state.outputData.tariff_id;
export default outputDataSlice.reducer;
