import { takeLatest } from "redux-saga/effects";
import { Actions } from "./actions";
import { completeWithRedirect, initProgress } from "./progressIndicatorSaga";
import { fetchAreaEnabled } from "./initDefaultSessionSaga";
import { defineUserLocation } from "./userLocationSaga";

function* checkApiCredentials() {
  yield initProgress();
  const areaEnabled = yield fetchAreaEnabled();
  if (!areaEnabled) {
    return;
  }
  yield defineUserLocation();
  yield completeWithRedirect("Home");
}

export default function* checkApiCredentialsSaga() {
  yield takeLatest(Actions.checkApiCredentials, checkApiCredentials);
}
