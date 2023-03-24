import { FlatpeakService } from "@flat-peak/javascript-sdk";
global.Buffer = global.Buffer || require("buffer").Buffer;

const service = new FlatpeakService(
  "https://api.flatpeak.energy",
  "",
  (message) => {
    console.log("[SERVICE]: " + message);
  }
);

export { service };
