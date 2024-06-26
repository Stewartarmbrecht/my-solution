const IS_PROD = process.env.APP_VARIANT === 'prod';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  name: IS_PROD ? 'MyAdmin' : (IS_PREVIEW ? 'MyAdmin (Preview)' : 'MyAdmin (Dev)'),
  slug: 'my-admin',
  version: '0.0.7',
  runtimeVersion: '0.0.7',
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
  scheme: IS_PROD ? 'my-admin' : (IS_PREVIEW ? 'my-admin-preview' : 'my-admin-dev'),
  updates: {
    url: 'https://u.expo.dev/fbd799b8-ac94-42ee-83ff-194ce23b9a59',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
    bundleIdentifier: IS_PROD ? 'com.stewartarmbrecht.myadmin' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.myadmin.preview' : 'com.stewartarmbrecht.myadmin.dev'),
  },
  android: {
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_PROD ? 'com.stewartarmbrecht.myadmin' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.myadmin.preview' : 'com.stewartarmbrecht.myadmin.dev'),
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
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    // This is the project ID from the previous step
    eas: {
      projectId: 'fbd799b8-ac94-42ee-83ff-194ce23b9a59',
    },
  },
};