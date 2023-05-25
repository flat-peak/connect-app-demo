import { put, takeLatest, delay } from "redux-saga/effects";
import { Actions } from "./actions";
import { initSession } from "./initSessionSaga";
import { setInputParam } from "../reducers/inputDataReducer";
import { setDeveloperMode, setOffPeakCharge } from "../reducers/contextReducer";
import { generateMacAddress } from "../../global/common";
import { completeWithRedirect } from "./progressIndicatorSaga";
import { DemoPostalAddress } from "../../data/input-scenarios";

function* initDeveloperSession() {
  yield put(setDeveloperMode(true));
  yield put(setOffPeakCharge(true));
  yield put(setInputParam({ key: "postalAddress", value: DemoPostalAddress }));
  yield completeWithRedirect("DataInput");
  yield delay(400);
  yield put(setOffPeakCharge(false));
}

function* initDefaultSession() {
  yield put(setOffPeakCharge(true));
  yield put(setDeveloperMode(false));
  yield put(setInputParam({ key: "postalAddress", value: DemoPostalAddress }));
  yield put(setInputParam({ key: "macAddress", value: generateMacAddress() }));
  yield initSession("ProviderSelection");
  yield delay(400);
  yield put(setOffPeakCharge(false));
}
export default function* initDefaultSessionSaga() {
  yield takeLatest(Actions.initDefaultSession, initDefaultSession);
  yield takeLatest(Actions.initDeveloperSession, initDeveloperSession);
}
