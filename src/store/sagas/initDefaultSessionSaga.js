import { call, put, takeLatest } from "redux-saga/effects";
import { Actions } from "./actions";
import { initSession } from "./initSessionSaga";
import { setInputData, setInputParam } from "../reducers/inputDataReducer";
import {
  setAreaEnabled,
  setDeveloperMode,
  setOffPeakCharge,
} from "../reducers/contextReducer";
import { generateMacAddress } from "../../global/common";
import { completeWithRedirect, stopIfError } from "./progressIndicatorSaga";
import { handleGetAccount } from "./api-handlers";
import { InputScenarios } from "../../data/input-scenarios";

function* fetchAreaEnabled() {
  /** @type {account} */
  let account = yield call(handleGetAccount);
  if (yield stopIfError(account)) {
    return null;
  }
  const areaEnabled = account?.area_enabled || [];
  yield put(setAreaEnabled(areaEnabled));
  return areaEnabled;
}

function* initDeveloperSession() {
  const areaEnabled = yield fetchAreaEnabled();
  if (!areaEnabled) {
    return;
  }
  yield put(setDeveloperMode(true));
  yield put(setOffPeakCharge(true));
  yield put(setInputData(InputScenarios.BLANK));
  yield completeWithRedirect("ScenarioPicker");
}

function* initDefaultSession() {
  const areaEnabled = yield fetchAreaEnabled();
  if (!areaEnabled) {
    return;
  }
  yield put(setDeveloperMode(false));
  yield put(setOffPeakCharge(true));
  yield put(setInputData(InputScenarios.BLANK));
  yield put(setInputParam({ key: "macAddress", value: generateMacAddress() }));
  yield initSession("ProviderSelection");
}
export default function* initDefaultSessionSaga() {
  yield takeLatest(Actions.initDefaultSession, initDefaultSession);
  yield takeLatest(Actions.initDeveloperSession, initDeveloperSession);
}
