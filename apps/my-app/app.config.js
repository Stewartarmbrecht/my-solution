const IS_PROD = process.env.APP_VARIANT === 'prod';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  name: IS_PROD ? 'MyApp' : (IS_PREVIEW ? 'MyApp (Preview)' : 'MyApp (Dev)'),
  slug: 'my-app',
  version: '0.0.3',
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
  scheme: 'myapp',
  updates: {
    url: "https://u.expo.dev/fbd799b8-ac94-42ee-83ff-194ce23b9a59"
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    userInterfaceStyle: 'automatic',
    bundleIdentifier: IS_PROD ? 'com.stewartarmbrecht.myapp' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.myapp.preview' : 'com.stewartarmbrecht.myapp.dev'),
  },
  android: {
    userInterfaceStyle: 'automatic',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_PROD ? 'com.stewartarmbrecht.myapp' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.myapp.preview' : 'com.stewartarmbrecht.myapp.dev'),
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
    [
      '@config-plugins/detox',
      {
        skipProguard: false,
        subdomains: ['localhost', '10.24.1.57'],
      },
    ],
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
  runtimeVersion: {
    policy: 'appVersion',
  },
};