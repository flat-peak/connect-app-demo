import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { COUNTRY_CODES } from "../../data/tariff-constants";
import { flatpeak, throwOnApiError } from "../../service/flatpeak.service";
import { withProgressMiddleware } from "./progressIndicatorReducer";
import { generateMacAddress } from "../../global/common";
import { getLocation } from "../../service/ip.service";

export const defineUserLocation = createAsyncThunk(
  "context/defineUserLocation",
  () => getLocation()
);

export const fetchAreaEnabled = createAsyncThunk(
  "context/fetchAreaEnabled",
  async () => {
    let account = throwOnApiError(await flatpeak.accounts.current());
    return Array.isArray(account?.area_enabled) && account.area_enabled.length
      ? account.area_enabled
      : Object.keys(COUNTRY_CODES).map((country_code) => ({ country_code }));
  }
);

export const initContext = createAsyncThunk(
  "context/init",
  withProgressMiddleware(async (args, thunkAPI) => {
    const fetchResult = await thunkAPI.dispatch(fetchAreaEnabled());
    if (fetchAreaEnabled.rejected.match(fetchResult)) {
      throw fetchResult.error;
    }
    const locationResult = await thunkAPI.dispatch(defineUserLocation());
    if (defineUserLocation.rejected.match(locationResult)) {
      throw locationResult.error;
    }
  })
);

export const startSimpleFlow = createAsyncThunk(
  "context/startSimpleFlow",
  withProgressMiddleware(async () => {
    const macAddress = generateMacAddress();
    throwOnApiError(
      await flatpeak.devices.checkDeviceMac({
        mac: macAddress,
      })
    );
    return {
      macAddress,
    };
  })
);

export const startDeveloperFlow = createAsyncThunk(
  "context/startDeveloperFlow",
  withProgressMiddleware(async () => {
    const macAddress = generateMacAddress();
    return {
      macAddress,
    };
  })
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreaEnabled.fulfilled, (state, action) => {
        state.areaEnabled = action.payload.sort((entryA, entryB) => {
          const countryA = COUNTRY_CODES[entryA.country_code];
          const countryB = COUNTRY_CODES[entryB.country_code];
          return countryA.localeCompare(countryB);
        });
      })
      .addCase(startSimpleFlow.pending, (state, action) => {
        state.developerMode = false;
      })
      .addCase(startDeveloperFlow.pending, (state, action) => {
        state.developerMode = true;
      });
  },
});

export const { setOffPeakCharge, setDeveloperMode } = contextSlice.actions;
export const selectOffPeakCharge = (state) => state.context.offPeakCharge;
export const selectDeveloperMode = (state) => state.context.developerMode;
export const selectAreaEnabled = (state) => state.context.areaEnabled;

export default contextSlice.reducer;
