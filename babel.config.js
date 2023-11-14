module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      /**
       * 아래 플러그인 추가 이유 : https://docs.expo.dev/versions/latest/sdk/reanimated/#web-support
       *
       * side effect : https://github.com/facebook/metro/issues/877
       */
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
  };
};
