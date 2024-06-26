const IS_PROD = process.env.APP_VARIANT === 'prod';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  name: IS_PROD ? 'MySite' : (IS_PREVIEW ? 'MySite (Preview)' : 'MySite (Dev)'),
  slug: 'my-site',
  version: '0.0.1',
  runtimeVersion: '0.0.1',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  // Added for tamagui.
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  }, 
  owner: 'stewartarmbrecht',
  scheme: IS_PROD ? 'my-site' : (IS_PREVIEW ? 'my-site-preview' : 'my-site-dev'),
  updates: {
    url: 'https://u.expo.dev/23520236-b7cb-4926-a76f-3cdf4775c965',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
    bundleIdentifier: IS_PROD ? 'com.stewartarmbrecht.mysite' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.mysite.preview' : 'com.stewartarmbrecht.mysite.dev'),
  },
  android: {
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_PROD ? 'com.stewartarmbrecht.mysite' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.mysite.preview' : 'com.stewartarmbrecht.mysite.dev'),
  },
  web: {
    favicon: './assets/images/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
    // Added as part of tamagui.
    'expo-font',
    [
      "expo-screen-orientation",
      {
        "initialOrientation": "DEFAULT"
      }
    ],
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    // This is the project ID from the previous step
    eas: {
      projectId: '23520236-b7cb-4926-a76f-3cdf4775c965',
    },
  },
};