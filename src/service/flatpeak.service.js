import { FlatpeakService } from "@flat-peak/javascript-sdk";
global.Buffer = global.Buffer || require("buffer").Buffer;

const service = new FlatpeakService(
  process.env.DEFAULT_API_URL || "https://api.flatpeak.energy",
  process.env.DEFAULT_PUBLISHABLE_KEY || "",
  (message) => {
    console.log("[SERVICE]: " + message);
  }
);
const isFailedResult = (object) => object?.type === "error";

/**
 * @return {Promise<{}>}
 */
const getLocation = () => {
  return fetch("https://ipapi.co/json/").then((r) => r.json());
};

export { service, isFailedResult, getLocation };
