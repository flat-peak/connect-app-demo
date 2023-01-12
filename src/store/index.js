import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { Platform } from "react-native";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootSaga from "./sagas";

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: reducer,
  middleware: middleware,
  // To disable devtools in production
  //devTools: process.env.NODE_ENV !== 'production',
  devTools: Platform.OS === "web",
});

sagaMiddleware.run(rootSaga);
export { store };
