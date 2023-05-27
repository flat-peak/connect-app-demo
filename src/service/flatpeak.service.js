import { FlatpeakService } from "@flat-peak/javascript-sdk";
import { isEqualObjects } from "../global/common";

global.Buffer = global.Buffer || require("buffer").Buffer;

const service = new FlatpeakService(
  process.env.DEFAULT_API_URL || "https://api.flatpeak.energy",
  process.env.DEFAULT_PUBLISHABLE_KEY || "",
  (message) => {
    console.log("[SERVICE]: " + message);
  }
);
export const throwOnApiError = (input) => {
  if (input?.object === "error") {
    throw new Error(input.message);
  }
  return input;
};

export const saveManualTariffCall = async ({
  macAddress,
  timezone,
  postalAddress,
  productId,
  customerId,
  providerId,
  tariffPlan,
}) => {
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
  const checkMacResponse = throwOnApiError(
    await service.checkMacAddress({
      mac: macAddress,
      ...(customerId && { customer_id: customerId }),
    })
  );

  // Has customer_id?
  if (customerId) {
    // fetch customer
    /** @type {Customer} */
    customer = throwOnApiError(await service.getCustomer(customerId));
  } else {
    // create customer & insert _id into session
    /** @type {Customer} */
    customer = throwOnApiError(await service.createCustomer({}));
    customerId = customer.id;
  }

  // Has product_id?
  const hasProductId = Boolean(productId);

  /** @type {ProductCreate | ProductUpdate} */
  const productPayload = {
    customer_id: customerId,
    provider_id: providerId,
    timezone: timezone,
    postal_address: postalAddress,
  };

  if (hasProductId) {
    // update product
    // fetch customer
    /** @type {Product} */
    product = throwOnApiError(await service.getProduct(productId));
    /** @type {Product} */
    product = throwOnApiError(
      await service.updateProduct(productId, productPayload)
    );
  } else {
    // create product & insert _id into session
    /** @type {Product} */
    product = throwOnApiError(await service.createProduct(productPayload));
    productId = product.id;
  }

  let isNewTariff = true;

  if (tariffPlan.id) {
    /** @type {Tariff} */
    const origPlan = throwOnApiError(await service.getTariff(tariffPlan.id));
    isNewTariff = !isEqualObjects(origPlan, tariffPlan, [
      "timezone",
      "display_name",
      "product_id",
      "import",
      "export",
    ]);
  }

  if (isNewTariff) {
    /** @type {TariffCreate} */
    const tariffPayload = {
      product_id: productId,
      display_name: tariffPlan.display_name,
      import: tariffPlan.import,
      export: tariffPlan.export,
      timezone: timezone,
    };
    /** @type {Tariff} */
    tariff = throwOnApiError(await service.createTariff(tariffPayload));

    /** @type {ProductUpdate} */
    const settingsPayload = {
      tariff_settings: {
        display_name: tariff.display_name,
        is_enabled: true,
        integrated: false,
        tariff_id: tariff.id,
      },
    };

    /** @type {Product} */
    product = throwOnApiError(
      await service.updateProduct(productId, settingsPayload)
    );
    tariffId = tariff.id;
  }

  const isNewDevice =
    !checkMacResponse.device_id ||
    !product.devices.includes(checkMacResponse.device_id);

  if (isNewDevice) {
    /** @type {Device} */
    device = throwOnApiError(
      await service.createDevice({
        mac: macAddress,
        products: [productId],
        customer_id: customerId,
      })
    );
    deviceId = device.id;
  }
  return {
    device_id: deviceId,
    customer_id: customerId,
    product_id: productId,
    tariff_id: tariffId,
  };
};

export const saveConnectedTariffCall = async ({
  macAddress,
  timezone,
  postalAddress,
  productId,
  customerId,
  tariffPlan,
}) => {
  if (!productId || !customerId || !tariffPlan.id) {
    throw new Error("Required object is missing");
  }

  // can this mac be used?
  const { device_id } = throwOnApiError(
    await service.checkMacAddress({
      mac: macAddress,
      ...(customerId && { customer_id: customerId }),
    })
  );

  /** @type {Device} */
  let device;

  /** @type {Product} */
  let product = throwOnApiError(await service.getProduct(productId));

  /** @type {Customer} */
  let customer = throwOnApiError(await service.getCustomer(productId));

  const isNewDevice = !device_id || !product.devices.includes(device_id);

  if (isNewDevice) {
    /** @type {Device} */
    device = throwOnApiError(
      await service.createDevice({
        mac: macAddress,
        products: [product.id],
        customer_id: customer.id,
      })
    );
  }

  return {
    device_id: device ? device.id : device_id,
    customer_id: customer.id,
    product_id: product.id,
    tariff_id: tariffPlan.id,
  };
};

export { service };
