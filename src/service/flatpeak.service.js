import { FlatpeakService } from "@flat-peak/javascript-sdk";
global.Buffer = global.Buffer || require("buffer").Buffer;

const service = new FlatpeakService(
  "https://stg-api.flatpeak.energy",
  "pk_test_ZVqvEgrZBIe4ZxVcnWCOzwoTphiv9IGF",
  (message) => {
    console.log("[SERVICE]: " + message);
  }
);

export { service };
