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
import { COUNTRY_CODES } from "../../data/tariff-constants";

export function* fetchAreaEnabled() {
  /** @type {account} */
  let account = yield call(handleGetAccount);
  if (yield stopIfError(account)) {
    return null;
  }
  const areaEnabled =
    Array.isArray(account?.area_enabled) && account.area_enabled.length
      ? account.area_enabled
      : Object.keys(COUNTRY_CODES).map((country_code) => ({ country_code }));

  yield put(setAreaEnabled(areaEnabled));
  yield put(
    setCountry(
      areaEnabled.some((area) => area.country_code === "GB")
        ? "GB"
        : areaEnabled[0].country_code
    )
  );
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
