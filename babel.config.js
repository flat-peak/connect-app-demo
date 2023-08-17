module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset", "babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@app/global": "./global",
            "@app/screens": "./app",
            "@app/widgets": "./widgets",
            "@app/shared": "./shared",
            "@app/assets": "./assets",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
