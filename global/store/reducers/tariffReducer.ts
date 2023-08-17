import { flatpeak } from "@app/shared/lib";
import { throwOnApiError } from "@flat-peak/javascript-sdk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { startDeveloperFlow, startSimpleFlow } from "./contextReducer";
import { withProgressMiddleware } from "./progressIndicatorReducer";

/**
 * @return TariffPlan
 */
export const blankTariff = () => {
  return {
    id: undefined,
    object: "tariff",
    display_name: undefined,
    product_id: undefined,
    timezone: undefined,
    time_created: undefined,
    time_expiry: undefined,
    import: undefined,
    export: undefined,
  };
};

const handleResetTariff = (state) => {
  state.plan = blankTariff();
  state.provider = undefined;
  state.saved = false;
};

export const connectTariff = createAsyncThunk(
  "tariff/connect",
  withProgressMiddleware(
    async ({ customer_id, product_id, tariff_id, provider_id }) => {
      const [provider, customer, product, tariff] = await Promise.all(
        [
          flatpeak.providers.retrieve(provider_id),
          flatpeak.customers.retrieve(customer_id),
          flatpeak.products.retrieve(product_id),
          flatpeak.tariffs.retrieve(tariff_id),
        ].map((request) => request.then((obj) => throwOnApiError(obj)))
      );
      return {
        provider,
        customer,
        product,
        tariff,
      };
    }
  )
);

export const tariffSlice = createSlice({
  name: "tariff",
  initialState: {
    plan: blankTariff(),
    provider: undefined,
    saved: false,
    structure: {
      time: true,
      hours: false,
      months: false,
    },
  },
  reducers: {
    setTariff: (state, action) => {
      state.plan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSimpleFlow.fulfilled, handleResetTariff)
      .addCase(startDeveloperFlow.fulfilled, handleResetTariff);
  },
});

export const { setTariff } = tariffSlice.actions;

export default tariffSlice.reducer;
