import { call, put, takeLatest, select } from "redux-saga/effects";
import { Actions } from "./actions";
import { setTariffSaved } from "../reducers/tariffReducer";
import { setOutputData } from "../reducers/outputDataReducer";

import {
  handleCreateCustomer,
  handleCreateDevice,
  handleCreateProduct,
  handleGetProduct,
  handleCreateTariff,
  handleUpdateProduct,
  handleGetCustomer,
  handleCheckMacAddress,
  handleGetTariff,
} from "./api-handlers";
import { isEqualObjects } from "../../global/common";
import {
  completeProgress,
  initProgress,
  stopIfError,
} from "./progressIndicatorSaga";

function* saveConnectedTariffCall({ payload }) {
  let {
    /** @type {App.TariffState} */ tariff,
    inputData: { macAddress, timezone, postalAddress, productId, customerId },
  } = yield select();

  yield initProgress();

  console.log("saveConnectedTariffCall() -> input", {
    macAddress,
    timezone,
    postalAddress,
    productId,
    customerId,
    tariff,
  });

  if (!productId || !customerId || !tariff.plan.id) {
    if (
      yield stopIfError({
        object: "error",
        type: "Session error",
        title: "Required object is missing",
      })
    ) {
      return;
    }
  }

  // can this mac be used?
  const checkMacResponse = yield call(handleCheckMacAddress, {
    macAddress,
    customerId,
  });

  if (yield stopIfError(checkMacResponse)) {
    return;
  }

  /** @type {Device} */
  let device;

  /** @type {Product} */
  let product = yield call(handleGetProduct, { productId });

  if (yield stopIfError(product)) {
    return;
  }
  /** @type {Customer} */
  let customer = yield call(handleGetCustomer, { customerId });

  if (yield stopIfError(customer)) {
    return;
  }

  // TODO: consider to avoid the duplicated fragment of code
  const isNewDevice =
    !checkMacResponse.device_id ||
    !product.devices.includes(checkMacResponse.device_id);

  if (isNewDevice) {
    /**
     * @type {Device}
     */
    device = yield call(handleCreateDevice, {
      payload: {
        mac: macAddress,
        products: [product.id],
        customer_id: customer.id,
      },
    });
    if (yield stopIfError(device)) {
      return;
    }
  }

  yield put(
    setOutputData({
      device_id: device.id,
      customer_id: customer.id,
      product_id: product.id,
      tariff_id: tariff.plan.id,
    })
  );
  yield put(setTariffSaved(true));
  yield completeProgress();
}

function* saveManualTariffCall({ payload }) {
  let {
    /** @type {App.TariffState} */ tariff: tariffState,
    inputData: { macAddress, timezone, postalAddress, productId, customerId },
  } = yield select();

  yield initProgress();

  console.log("saveTariff() -> input", {
    macAddress,
    timezone,
    postalAddress,
    productId,
    customerId,
  });

  /** @type {Product} */
  let product;
  /** @type {Device} */
  let device;
  /** @type {Customer} */
  let customer;
  /** @type {Tariff} */
  let tariff;

  let deviceId;
  let tariffId;

  // can this mac be used?
  const checkMacResponse = yield call(handleCheckMacAddress, {
    macAddress,
    customerId,
  });

  if (yield stopIfError(checkMacResponse)) {
    return;
  }

  // Has customer_id?
  if (customerId) {
    // fetch customer
    /** @type {Customer} */
    customer = yield call(handleGetCustomer, { customerId });
    if (yield stopIfError(customer)) {
      return;
    }
  } else {
    // create customer & insert _id into session
    /** @type {Customer} */
    customer = yield call(handleCreateCustomer, { payload: {} });
    if (yield stopIfError(customer)) {
      return;
    }
    customerId = customer.id;
  }

  // Has product_id?
  const hasProductId = Boolean(productId);

  /** @type {ProductCreate | ProductUpdate} */
  const productPayload = {
    customer_id: customerId,
    provider_id: tariffState.provider.id,
    timezone: timezone,
    postal_address: postalAddress,
  };

  if (hasProductId) {
    // update product
    // fetch customer
    /** @type {Product} */
    product = yield call(handleGetProduct, { productId });
    if (yield stopIfError(product)) {
      return;
    }

    /** @type {Product} */
    product = yield call(handleUpdateProduct, {
      productId: productId,
      payload: productPayload,
    });
    if (yield stopIfError(product)) {
      return;
    }
  } else {
    // create product & insert _id into session
    /** @type {Product} */
    product = yield call(handleCreateProduct, {
      payload: productPayload,
    });

    if (yield stopIfError(product)) {
      return;
    }

    productId = product.id;
  }

  let isNewTariff = true;

  if (tariffState.plan.id) {
    /** @type {Tariff} */
    const origPlan = yield call(handleGetTariff, {
      tariffId: tariffState.plan.id,
    });

    if (origPlan.id) {
      isNewTariff = !isEqualObjects(origPlan, tariffState.plan, [
        "timezone",
        "display_name",
        "product_id",
        "import",
        "export",
      ]);
    }
  }

  if (isNewTariff) {
    /** @type {TariffCreate} */
    const tariffPayload = {
      product_id: productId,
      display_name: tariffState.plan.display_name,
      import: tariffState.plan.import,
      export: tariffState.plan.export,
      timezone: timezone,
    };
    /** @type {Tariff} */
    tariff = yield call(handleCreateTariff, {
      payload: tariffPayload,
    });
    if (yield stopIfError(tariff)) {
      return;
    }

    /** @type {ProductUpdate} */
    const settingsPayload = {
      tariff_settings: {
        display_name: tariffState.plan.display_name,
        is_enabled: true,
        integrated: false,
        tariff_id: tariff.id,
      },
    };

    /** @type {Product} */
    product = yield call(handleUpdateProduct, {
      productId: productId,
      payload: settingsPayload,
    });

    tariffId = tariff.id;
  }

  const isNewDevice =
    !checkMacResponse.device_id ||
    !product.devices.includes(checkMacResponse.device_id);

  if (isNewDevice) {
    /** @type {Device} */
    device = yield call(handleCreateDevice, {
      payload: {
        mac: macAddress,
        products: [productId],
        customer_id: customerId,
      },
    });
    if (yield stopIfError(device)) {
      return;
    }
    deviceId = device.id;
  }

  console.log("saveTariff -> complete()", {
    device_id: deviceId,
    customer_id: customerId,
    product_id: productId,
    tariff_id: tariffId,
    product,
    tariff: tariff,
    device,
  });

  yield put(
    setOutputData({
      device_id: deviceId,
      customer_id: customerId,
      product_id: productId,
      tariff_id: tariffId,
    })
  );
  yield put(setTariffSaved(true));
  yield completeProgress();
}

export default function* saveTariffSaga() {
  yield takeLatest(Actions.saveManualTariff, saveManualTariffCall);
  yield takeLatest(Actions.saveConnectedTariff, saveConnectedTariffCall);
}
