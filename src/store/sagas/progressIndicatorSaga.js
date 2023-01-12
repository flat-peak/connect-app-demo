import { put } from "redux-saga/effects";
import { setError, setLoading } from "../reducers/progressIndicatorReducer";
import { StackActions } from "@react-navigation/native";
import { dispatchNavigationAction } from "../../components/Navigator";

export function* initProgress() {
  yield put(setLoading(true));
}

export function* stopIfError(error) {
  if (error.object === "error") {
    yield put(setLoading(false));
    yield put(
      setError({
        visible: true,
        title: error.type === "api_error" ? "API error" : error.type,
        message: error.message,
      })
    );
    return true;
  }
  return false;
}

export function* completeProgress() {
  yield put(setLoading(false));
}

export function* completeWithRedirect(redirectScreen) {
  yield put(setLoading(false));
  dispatchNavigationAction(StackActions.push(redirectScreen));
}
