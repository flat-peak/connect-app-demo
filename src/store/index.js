import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { Platform } from "react-native";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./sagas";

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: Platform.OS === "web",
});

sagaMiddleware.run(rootSaga);
export { store };
