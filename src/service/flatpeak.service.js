import { API_PUBLISHABLE_KEY, API_URL } from "@env";
import { FlatpeakService } from "@flat-peak/javascript-sdk";
global.Buffer = global.Buffer || require("buffer").Buffer;

const service = new FlatpeakService(API_URL, API_PUBLISHABLE_KEY, (message) => {
  console.log("[SERVICE]: " + message); // TODO: consider to use cloudwatch
});

export { service };
