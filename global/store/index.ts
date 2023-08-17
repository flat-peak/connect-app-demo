import { configureStore } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import reducer from "./reducers";
import { InputState } from "./reducers/inputDataReducer";

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: Platform.OS === "web",
});

export type AppState = {
  inputData: InputState;
};

export { store };
