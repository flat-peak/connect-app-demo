import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  defineUserLocation,
  fetchAreaEnabled,
  startDeveloperFlow,
  startSimpleFlow,
} from "./contextReducer";
import { DemoPostalAddress } from "../../data/input-scenarios";
import { withProgressMiddleware } from "./progressIndicatorReducer";
import { service, throwOnApiError } from "../../service/flatpeak.service";
import { connectTariff, setTariff } from "./tariffReducer";

export const initInputParams = createAsyncThunk(
  "inputData/initInputParams",
  withProgressMiddleware(async (args, thunkAPI) => {
    let {
      inputData: { macAddress, customerId, productId },
    } = thunkAPI.getState();

    // create session for existing product_id
    if (productId) {
      /** @type {Product} */
      const product = throwOnApiError(await service.getProduct(productId));
      if (product.postal_address) {
        thunkAPI.dispatch(setAddress(product.postal_address));
      }

      if (!customerId) {
        customerId = product.customer_id;
        thunkAPI.dispatch(
          setInputParam({ key: "customerId", value: customerId })
        );
      }

      throwOnApiError(await service.getCustomer(customerId));

      // can this mac be used?
      throwOnApiError(
        await service.checkMacAddress({
          mac: macAddress,
          customer_id: customerId,
        })
      );

      /** @type {Tariff} */
      const tariff = throwOnApiError(
        await service.getTariff(product.tariff_settings.tariff_id)
      );
      thunkAPI.dispatch(setTariff(tariff));

      return { completed: true };
    }

    // create session for new product && existing customer_id
    if (customerId) {
      throwOnApiError(await service.getCustomer(customerId));
      // can this mac be used?
      throwOnApiError(
        await service.checkMacAddress({
          mac: macAddress,
          ...(customerId && { customer_id: customerId }),
        })
      );
      return { completed: false };
    }

    // From scratch
    throwOnApiError(await service.checkMacAddress({ mac: macAddress }));
    return { completed: false };
  })
);

export const inputDataSlice = createSlice({
  name: "inputData",
  initialState: /** @type {App.InputState} */ {
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
    },
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
      .addCase(startSimpleFlow.pending, (state, action) => {
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
        state.macAddress = action.payload.macAddress;
        state.customerId = "";
        state.productId = "";
        state.deviceId = "";
      })
      .addCase(startDeveloperFlow.pending, (state, action) => {
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
        state.macAddress = action.payload.macAddress;
        state.customerId = "";
        state.productId = "";
        state.deviceId = "";
      })
      .addCase(connectTariff.fulfilled, (state, action) => {
        state.productId = action.payload.product.id;
        state.customerId = action.payload.customer.id;
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
