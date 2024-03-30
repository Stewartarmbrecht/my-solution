module.exports = function (api) {
  api.cache(true);
  process.env.EXPO_ROUTER_APP_ROOT = "../../apps/my-app/app";
  process.env.EXPO_ROUTER_ABS_APP_ROOT = "/app";
  return {
    presets: ['babel-preset-expo'],
  };
};
