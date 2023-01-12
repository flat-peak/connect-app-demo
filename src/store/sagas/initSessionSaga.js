import { takeLatest, call, put, select } from "redux-saga/effects";
import { Actions } from "./actions";
import { setAddress, setInputParam } from "../reducers/inputDataReducer";
import { resetTariff, setTariff } from "../reducers/tariffReducer";
import {
  handleCheckMacAddress,
  handleGetCustomer,
  handleGetProduct,
  handleGetTariff,
} from "./api-handlers";
import {
  completeWithRedirect,
  initProgress,
  stopIfError,
} from "./progressIndicatorSaga";

// create session for existing product_id
function* initSessionForExistingProduct(productId, customerId, macAddress) {
  /** @type {Product} */
  const product = yield call(handleGetProduct, { productId });
  if (yield stopIfError(product)) {
    return;
  }
  if (product.postal_address) {
    yield put(setAddress(product.postal_address));
  }

  if (!customerId) {
    customerId = product.customer_id;
    yield put(setInputParam({ key: "customerId", value: customerId }));
  }

  /** @type {Customer} */
  const customer = yield call(handleGetCustomer, { customerId });
  if (yield stopIfError(customer)) {
    return;
  }

  // can this mac be used?
  const checkMacResponse = yield call(handleCheckMacAddress, {
    macAddress,
    customerId,
  });
  if (yield stopIfError(checkMacResponse)) {
    return;
  }
  /** @type {Tariff} */
  const tariff = yield call(handleGetTariff, {
    tariffId: product.tariff_settings.tariff_id,
  });
  if (yield stopIfError(tariff)) {
    return;
  }
  yield put(setTariff(tariff));

  yield completeWithRedirect("Summary");
}

// create session for new product && existing customer_id
function* initSessionForExistingCustomer(
  customerId,
  macAddress,
  redirectScreen
) {
  /** @type {Customer} */
  const customer = yield call(handleGetCustomer, { customerId });
  if (yield stopIfError(customer)) {
    return;
  }

  // can this mac be used?
  const checkMacResponse = yield call(handleCheckMacAddress, {
    macAddress,
    customerId,
  });
  if (yield stopIfError(checkMacResponse)) {
    return;
  }

  console.log("initSession -> forExistingCustomer -> result()");

  yield completeWithRedirect(redirectScreen);
}

// create session from scratch
function* initBlankSession(macAddress, redirectScreen) {
  // can this mac be used?
  const checkMacResponse = yield call(handleCheckMacAddress, {
    macAddress,
  });
  if (yield stopIfError(checkMacResponse)) {
    return;
  }

  yield completeWithRedirect(redirectScreen);
}

export function* initSession(redirectScreen) {
  let {
    inputData: { macAddress, customerId, productId, deviceId, timezone },
  } = yield select();
  console.log("initSession -> input()", {
    macAddress,
    customerId,
    productId,
    timezone,
    deviceId,
  });

  yield put(resetTariff());
  yield initProgress();

  if (productId) {
    yield initSessionForExistingProduct(productId, customerId, macAddress);
  } else if (customerId) {
    yield initSessionForExistingCustomer(
      customerId,
      macAddress,
      redirectScreen
    );
  } else {
    yield initBlankSession(macAddress, redirectScreen);
  }
}

function* handleInitSession() {
  yield initSession("AddressEdit");
}

export default function* initInputParamsSaga() {
  yield takeLatest(Actions.initSession, handleInitSession);
}
