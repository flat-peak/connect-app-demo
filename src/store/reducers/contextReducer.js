import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { COUNTRY_CODES } from "../../data/tariff-constants";
import { setCountry } from "./inputDataReducer";
import { isFailedResult, service } from "../../service/flatpeak.service";

export const fetchAreaEnabled = createAsyncThunk(
  "context/fetchAreaEnabled",
  async ({}, thunkAPI) => {
    let account = await service.getAccount();
    if (isFailedResult(account)) {
      return thunkAPI.rejectWithValue(account);
    }
    const areaEnabled =
      Array.isArray(account?.area_enabled) && account.area_enabled.length
        ? account.area_enabled
        : Object.keys(COUNTRY_CODES).map((country_code) => ({ country_code }));

    thunkAPI.dispatch(
      setCountry(
        areaEnabled.some((area) => area.country_code === "GB")
          ? "GB"
          : areaEnabled[0].country_code
      )
    );
    return areaEnabled;
  }
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
    extraReducers: (builder) => {
      builder
        .addCase(fetchAreaEnabled.pending, (state) => {})
        .addCase(fetchAreaEnabled.rejected, (state, action) => {})
        .addCase(fetchAreaEnabled.fulfilled, (state, action) => {
          state.areaEnabled = action.payload.sort((entryA, entryB) => {
            const countryA = COUNTRY_CODES[entryA.country_code];
            const countryB = COUNTRY_CODES[entryB.country_code];
            return countryA.localeCompare(countryB);
          });
        });
    },
  },
});

export const { setOffPeakCharge, setDeveloperMode, setAreaEnabled } =
  contextSlice.actions;

export const selectOffPeakCharge = (state) => state.context.offPeakCharge;
export const selectDeveloperMode = (state) => state.context.developerMode;
export const selectAreaEnabled = (state) => state.context.areaEnabled;

export default contextSlice.reducer;
