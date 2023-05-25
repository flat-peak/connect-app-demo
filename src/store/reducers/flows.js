import { createAsyncThunk } from "@reduxjs/toolkit";
import { displayError, setLoading } from "./progressIndicatorReducer";
import { fetchAreaEnabled } from "./contextReducer";
import { defineUserLocation } from "./inputDataReducer";

export const runContextInitFlow = createAsyncThunk(
  "flow/contextInit",
  async ({}, thunkAPI) => {
    try {
      await thunkAPI.dispatch(setLoading(true));
      await thunkAPI.dispatch(fetchAreaEnabled({}));
      await thunkAPI.dispatch(defineUserLocation());
    } catch (error) {
      thunkAPI.dispatch(displayError(error));
      thunkAPI.rejectWithValue(error);
    } finally {
      await thunkAPI.dispatch(setLoading(false));
    }
  }
);
