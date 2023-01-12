import { call, put, takeLatest } from "redux-saga/effects";
import { setLoading, setProviders } from "../reducers/providerSelectionReducer";
import { Actions } from "./actions";
import { fetchProviders } from "./api-handlers";

function* loadProviderList({ payload }) {
  yield put(setLoading(true));
  const providers = yield call(fetchProviders, payload);
  yield put(setProviders(providers));
  yield put(setLoading(false));
}

export default function* providerSelectionSaga() {
  yield takeLatest(Actions.fetchProviderList, loadProviderList);
}
