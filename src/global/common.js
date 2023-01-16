export const objectToQueryString = (data) => {
  return Object.keys(data)
    .reduce((values, key) => {
      if (typeof data[key] === "undefined") {
        return values;
      }
      const value = String(data[key]);
      if (value.length) {
        values.push(`${key}=${value}`);
      }
      return values;
    }, [])
    .join("&");
};

/**
 * @return {string}
 */
export const generateMacAddress = () => {
  return "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
  });
};

/**
 * @param {object} source
 * @param {object} target
 * @param {Array<string>} [keys] - keys to check, all by default
 * @return {boolean|*}
 */
export const isEqualObjects = (source, target, keys) => {
  if (!keys || !keys.length) {
    return JSON.stringify(source) === JSON.stringify(target);
  }
  if (!source || !target) {
    return false;
  }
  return keys.every((key) => isEqualObjects(source[key], target[key]));
};

/**
 * @param {Provider} provider
 * @return {boolean}
 */
export const isConnectableProvider = (provider) => {
  return Boolean(provider?.integration_settings?.onboard_url?.trim());
};
