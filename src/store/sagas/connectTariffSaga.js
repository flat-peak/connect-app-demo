import { call, put, takeLatest } from "redux-saga/effects";
import { Actions } from "./actions";
import { setInputParam } from "../reducers/inputDataReducer";
import {
  handleGetCustomer,
  handleGetProduct,
  handleGetTariff,
} from "./api-handlers";
import {
  completeWithRedirect,
  initProgress,
  stopIfError,
} from "./progressIndicatorSaga";
import { setTariff } from "../reducers/tariffReducer";

function* connectTariff({ payload }) {
  yield initProgress();
  const { customer_id, product_id, tariff_id } = payload;

  // Process customer
  /** @type {Customer} */
  let customer = yield call(handleGetCustomer, { customerId: customer_id });
  if (yield stopIfError(customer)) {
    return;
  }

  // Process product
  /** @type {Product} */
  let product = yield call(handleGetProduct, { productId: product_id });
  if (yield stopIfError(product)) {
    return;
  }

  // Process tariff
  /** @type {Tariff} */
  const tariff = yield call(handleGetTariff, {
    tariffId: tariff_id,
  });
  if (yield stopIfError(tariff)) {
    return;
  }
  yield put(setTariff(tariff));

  // Update input params
  yield put(setInputParam({ key: "productId", value: product.id }));
  yield put(setInputParam({ key: "customerId", value: customer.id }));

  yield completeWithRedirect("Summary");
}

export default function* connectTariffSaga() {
  yield takeLatest(Actions.connectTariff, connectTariff);
}
