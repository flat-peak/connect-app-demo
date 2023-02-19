import { call, takeLatest } from "redux-saga/effects";
import { Actions } from "./actions";
import {
  completeWithRedirect,
  initProgress,
  stopIfError,
} from "./progressIndicatorSaga";
import { handleGetAccount } from "./api-handlers";

function* checkApiCredentials() {
  yield initProgress();
  /** @type {Account} */
  let customer = yield call(handleGetAccount);
  if (yield stopIfError(customer)) {
    return;
  }
  yield completeWithRedirect("Home");
}

export default function* checkApiCredentialsSaga() {
  yield takeLatest(Actions.checkApiCredentials, checkApiCredentials);
}
