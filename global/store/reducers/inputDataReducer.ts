import { DemoPostalAddress } from "@app/global/configs";
import { flatpeak } from "@app/shared/lib";
import {
  PostalAddress,
  Product,
  Tariff,
  throwOnApiError,
} from "@flat-peak/javascript-sdk";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "@app/global/store";
import {
  defineUserLocation,
  fetchAreaEnabled,
  startDeveloperFlow,
  startSimpleFlow,
} from "./contextReducer";
import { withProgressMiddleware } from "./progressIndicatorReducer";
import { setTariff } from "./tariffReducer";

export interface InputState {
  macAddress: string;
  customerId: string;
  productId: string;
  deviceId: string;
  timezone: string;
  postalAddress: PostalAddress;
}

export const initInputParams = createAsyncThunk(
  "inputData/initInputParams",
  withProgressMiddleware(async (args, thunkAPI) => {
    let {
      inputData: { macAddress, customerId, productId },
    } = thunkAPI.getState() as AppState;

    // create session for existing product_id
    if (productId) {
      const product = throwOnApiError(
        await flatpeak.products.retrieve(productId)
      ) as Product;
      if (product.postal_address) {
        thunkAPI.dispatch(setAddress(product.postal_address));
      }

      if (!customerId) {
        customerId = product.customer_id;
        thunkAPI.dispatch(
          setInputParam({ key: "customerId", value: customerId })
        );
      }

      throwOnApiError(await flatpeak.customers.retrieve(customerId));

      throwOnApiError(
        await flatpeak.devices.checkDeviceMac({
          mac: macAddress,
          customer_id: customerId,
        })
      );

      const tariff = throwOnApiError(
        await flatpeak.tariffs.retrieve(product.tariff_settings.tariff_id)
      ) as Tariff;
      thunkAPI.dispatch(setTariff(tariff));

      return { completed: true };
    }

    // create session for new product && existing customer_id
    if (customerId) {
      throwOnApiError(await flatpeak.customers.retrieve(customerId));
      // can this mac be used?
      throwOnApiError(
        await flatpeak.devices.checkDeviceMac({
          mac: macAddress,
          ...(customerId && { customer_id: customerId }),
        })
      );
      return { completed: false };
    }

    // From scratch
    throwOnApiError(await flatpeak.devices.checkDeviceMac({ mac: macAddress }));
    return { completed: false };
  })
);

export const inputDataSlice = createSlice({
  name: "inputData",
  initialState: {
    macAddress: "",
    customerId: "",
    productId: "",
    deviceId: "",
    timezone: "",
    country: "",
    postalAddress: {
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      post_code: "",
      country_code: "",
    } as PostalAddress,
  },
  reducers: {
    setInputData: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
    setInputParam: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setAddressField: (state, action) => {
      let { key, value } = action.payload;
      if (state.postalAddress.hasOwnProperty(key)) {
        state.postalAddress[key] = value;
      }
    },
    setAddress: (state, action) => {
      state.postalAddress = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(defineUserLocation.fulfilled, (state, action) => {
        const { country, timezone } = action.payload;
        state.country = country;
        state.timezone = timezone;
      })
      .addCase(fetchAreaEnabled.fulfilled, (state, action) => {
        const areaEnabled = action.payload;
        const countryCode = areaEnabled.some(
          (area) => area.country_code === "GB"
        )
          ? "GB"
          : areaEnabled[0].country_code;

        state.country = countryCode;
        state.postalAddress.country_code = countryCode;
      })
      .addCase(startSimpleFlow.pending, (state) => {
        if (state.country === "GB") {
          state.postalAddress = { ...DemoPostalAddress };
        } else {
          state.postalAddress = {
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            post_code: "",
            country_code: state.country,
          };
        }
      })
      .addCase(startSimpleFlow.fulfilled, (state, action) => {
        state.macAddress = (
          action.payload as { macAddress: string }
        ).macAddress;
        state.customerId = "";
        state.productId = "";
        state.deviceId = "";
      })
      .addCase(startDeveloperFlow.pending, (state) => {
        if (state.country === "GB") {
          state.postalAddress = { ...DemoPostalAddress };
        } else {
          state.postalAddress = {
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            post_code: "",
            country_code: state.country,
          };
        }
      })
      .addCase(startDeveloperFlow.fulfilled, (state, action) => {
        state.macAddress = (
          action.payload as { macAddress: string }
        ).macAddress;
        state.customerId = "";
        state.productId = "";
        state.deviceId = "";
      });
  },
});

export const {
  setInputParam,
  setAddressField,
  setAddress,
  setCountry,
  setTimezone,
} = inputDataSlice.actions;

export const selectMacAddress = (state) => state.inputData.macAddress;
export const selectProductId = (state) => state.inputData.productId;
export const selectCustomerId = (state) => state.inputData.customerId;
export const selectDeviceId = (state) => state.inputData.deviceId;
export const selectTimezone = (state) => state.inputData.timezone;
export const selectAddress = (state) => state.inputData.postalAddress;
export const selectCountry = (state) => state.inputData.country;

export default inputDataSlice.reducer;
