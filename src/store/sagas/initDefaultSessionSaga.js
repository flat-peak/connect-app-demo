import { call, put, takeLatest, delay } from "redux-saga/effects";
import { Actions } from "./actions";
import { initSession } from "./initSessionSaga";
import {
  setCountry,
  setInputData,
  setInputParam,
} from "../reducers/inputDataReducer";
import {
  setAreaEnabled,
  setDeveloperMode,
  setOffPeakCharge,
} from "../reducers/contextReducer";
import { generateMacAddress } from "../../global/common";
import { completeWithRedirect, stopIfError } from "./progressIndicatorSaga";
import { handleGetAccount } from "./api-handlers";
import { InputScenarios } from "../../data/input-scenarios";

export function* fetchAreaEnabled() {
  /** @type {account} */
  let account = yield call(handleGetAccount);
  if (yield stopIfError(account)) {
    return null;
  }
  const areaEnabled = account?.area_enabled || [];
  yield put(setAreaEnabled(areaEnabled));
  yield put(setCountry(areaEnabled[0]?.country_code));
  return areaEnabled;
}

function* initDeveloperSession() {
  yield put(setDeveloperMode(true));
  yield put(setOffPeakCharge(true));
  yield put(setInputData(InputScenarios.BLANK));
  yield completeWithRedirect("DataInput");
  yield delay(400);
  yield put(setOffPeakCharge(false));
}

function* initDefaultSession() {
  yield put(setOffPeakCharge(true));
  yield put(setDeveloperMode(false));
  yield put(setInputData(InputScenarios.BLANK));
  yield put(setInputParam({ key: "macAddress", value: generateMacAddress() }));
  yield initSession("ProviderSelection");
  yield delay(400);
  yield put(setOffPeakCharge(false));
}
export default function* initDefaultSessionSaga() {
  yield takeLatest(Actions.initDefaultSession, initDefaultSession);
  yield takeLatest(Actions.initDeveloperSession, initDeveloperSession);
}
