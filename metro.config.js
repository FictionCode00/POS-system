const { getDefaultConfig } = require("expo/metro-config");

// Plain Metro config. NativeWind is not used (the app styles with inline
// `style` objects only), so no withNativeWind / global.css injection.
module.exports = getDefaultConfig(__dirname);
