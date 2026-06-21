module.exports = function (api) {
  api.cache(true);
  return {
    // Plain Expo preset. The app styles entirely with inline `style` objects
    // (no Tailwind `className`), so NativeWind's JSX transform is intentionally
    // NOT used — it was silently dropping function-form Pressable `style`
    // props on native (invisible buttons). babel-preset-expo still auto-appends
    // the react-native-worklets plugin required by reanimated 4.
    presets: ["babel-preset-expo"],
  };
};
