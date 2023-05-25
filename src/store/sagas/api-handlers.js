import { service } from "../../service/flatpeak.service";

/**
 * @param {string} macAddress
 * @param {string} customerId
 * @return {Promise<{usable: boolean}>}
 */
export async function handleCheckMacAddress({ macAddress, customerId }) {
  return await service.checkMacAddress({
    mac: macAddress,
    ...(customerId && { customer_id: customerId }),
  });
}

/**
 * @param {string} keywords
 * @param {string} countryCode
 * @return {Promise<Array<Provider>>}
 */
export async function fetchProviders({ keyword, countryCode }) {
  return await service.getProviders({
    ...(keyword && { keywords: keyword }),
    ...(countryCode && { country_code: countryCode }),
    sort_order: "code_name",
    limit: 100,
  });
}

/**
 * @return {Promise<Account>}
 */
export async function handleGetAccount() {
  return await service.getAccount();
}

/**
 * @param {TariffCreate} payload
 * @return {Promise<Tariff>}
 */
export async function handleCreateTariff({ payload }) {
  return await service.createTariff(payload);
}

/**
 * @param {string} tariffId
 * @return {Promise<Tariff>}
 */
export async function handleGetTariff({ tariffId }) {
  return await service.getTariff(tariffId);
}

/**
 * @param {string} customerId
 * @param {CustomerCreate} payload
 * @return {Promise<Customer>}
 */
export async function handleCreateCustomer({ payload }) {
  return await service.createCustomer(payload);
}

/**
 * @param {string} customerId
 * @param {CustomerUpdate} payload
 * @return {Promise<Customer>}
 */
export async function handleUpdateCustomer({ customerId, payload }) {
  return await service.updateCustomer(customerId, payload);
}

/**
 * @param {string} customerId
 * @return {Promise<Customer>}
 */
export async function handleGetCustomer({ customerId }) {
  return await service.getCustomer(customerId);
}

/**
 * @param {ProductCreate} payload
 * @return {Promise<Product>}
 */
export async function handleCreateProduct({ payload }) {
  return await service.createProduct(payload);
}

/**
 * @param {string} productId
 * @param {ProductUpdate} payload
 * @return {Promise<Product>}
 */
export async function handleUpdateProduct({ productId, payload }) {
  return await service.updateProduct(productId, payload);
}

/**
 * @param {string} productId
 * @return {Promise<Product>}
 */
export async function handleGetProduct({ productId }) {
  return await service.getProduct(productId);
}

/**
 * @param {DeviceCreate} payload
 * @return {Promise<Device>}
 */
export async function handleCreateDevice({ payload }) {
  return await service.createDevice(payload);
}
