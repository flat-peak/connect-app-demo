import reducer from "./reducers";
import { Platform } from "react-native";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: Platform.OS === "web",
});

export { store };
