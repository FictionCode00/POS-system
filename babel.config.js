module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // babel-preset-expo auto-appends the react-native-worklets plugin
    // (required by reanimated 4) and keeps it last, so we don't add it here.
  };
};
