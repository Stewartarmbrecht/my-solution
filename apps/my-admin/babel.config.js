module.exports = function (api) {
  api.cache(true);
  process.env.EXPO_ROUTER_APP_ROOT = "../../apps/my-admin/app";
  process.env.EXPO_ROUTER_ABS_APP_ROOT = "/app";
  return {
    presets: ['babel-preset-expo'],
    // Added plugins as recommended by tamagui.
    plugins: [
      [
      "@tamagui/babel-plugin",
          {
              components: ["tamagui"],
              config: process.env.JEST_WORKER_ID !== undefined ? "./libs/ui/tamagui.config.ts" : "../../libs/ui/tamagui.config.ts",
              logTimings: true,
              disableExtraction: process.env.NODE_ENV === 'development'
          },
      ],

      // NOTE: this is only necessary if you are using reanimated for animations
      "react-native-reanimated/plugin",
    ],
  };
};
