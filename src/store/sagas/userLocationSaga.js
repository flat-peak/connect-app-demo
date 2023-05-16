import { call, put } from "redux-saga/effects";
import { handleGetLocation } from "./api-handlers";
import {
  setCountry,
  setInputParam,
  setTimezone,
} from "../reducers/inputDataReducer";

export function* defineUserLocation() {
  let location = yield call(handleGetLocation);
  yield put(setCountry(location.country));
  yield put(setTimezone(location.timezone));
  yield put(setInputParam({ key: "timezone", value: location.timezone }));
}
