import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { withProgressMiddleware } from "./progressIndicatorReducer";
import { service, throwOnApiError } from "../../service/flatpeak.service";

export const fetchProviderList = createAsyncThunk(
  "providerSelection/fetch",
  withProgressMiddleware(async ({ keyword, countryCode }) => {
    return throwOnApiError(
      await service.getProviders({
        ...(keyword && { keywords: keyword }),
        ...(countryCode && { country_code: countryCode }),
        sort_order: "code_name",
        limit: 100,
      })
    );
  })
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchProviderList.fulfilled, (state, action) => {
      state.providers = action.payload;
    });
  },
});

export const { setLoading, setProviders } = providerSelectionSlice.actions;

export const selectLoading = (state) => state.providerSelection.loading;
export const selectProviders = (state) => state.providerSelection.providers;

export default providerSelectionSlice.reducer;
