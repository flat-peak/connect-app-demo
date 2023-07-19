import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
  name: "progress",
  initialState: {
    loading: false,
    error: {
      visible: false,
      title: undefined,
      message: undefined,
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    dismissError: (state, action) => {
      state.error = {
        visible: false,
        critical: false,
        title: undefined,
        message: undefined,
      };
    },
  },
});

export const { setLoading, setError, dismissError } = progressSlice.actions;

export const selectError = (state) => state.progress.error;
export const selectLoading = (state) => state.progress.loading;

export default progressSlice.reducer;

export const displayError = (error) =>
  setError({
    visible: true,
    title: error.type === "api_error" ? "Error.API" : error.type,
    message: error.message,
  });

export const withProgressMiddleware = (handler) => {
  return async (args, thunkAPI) => {
    try {
      await thunkAPI.dispatch(setLoading(true));
      const result = await handler(args, thunkAPI);
      await thunkAPI.dispatch(setLoading(false));
      return result;
    } catch (error) {
      await thunkAPI.dispatch(setLoading(false));
      await thunkAPI.dispatch(displayError(error));
      throw error;
    }
  };
};
