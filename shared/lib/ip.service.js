/**
 * @return {Promise<{}>}
 */
export const getLocation = () => {
  return fetch("https://ipapi.co/json/").then((r) => r.json());
};
