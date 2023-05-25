import { all, call, spawn } from "redux-saga/effects";
import providerSelectionSaga from "./providerSelectionSaga";
import saveTariffSaga from "./saveTariffSaga";
import initSessionSaga from "./initSessionSaga";
import initDefaultSessionSaga from "./initDefaultSessionSaga";
import connectTariffSaga from "./connectTariffSaga";

export default function* rootSaga() {
  const sagas = [
    initDefaultSessionSaga,
    initSessionSaga,
    providerSelectionSaga,
    saveTariffSaga,
    connectTariffSaga,
  ];
  const retrySagas = yield sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });
  yield all(retrySagas);
}
