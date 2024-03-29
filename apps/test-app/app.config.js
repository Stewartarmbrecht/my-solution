const IS_PROD = process.env.APP_VARIANT === 'prod';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  name: IS_PROD ? 'TestApp' : (IS_PREVIEW ? 'TestApp (Preview)' : 'TestApp (Dev)'),
  slug: 'test-app',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  }, 
  owner: 'stewartarmbrecht',
  scheme: 'testapp',
  updates: {
    url: "https://u.expo.dev/fbd799b8-ac94-42ee-83ff-194ce23b9a59"
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_PROD ? 'com.stewartarmbrecht.testapp' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.testapp.preview' : 'com.stewartarmbrecht.testapp.dev'),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_PROD ? 'com.stewartarmbrecht.testapp' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.testapp.preview' : 'com.stewartarmbrecht.testapp.dev'),
  },
  web: {
    favicon: './assets/images/favicon.png',
    bundler: 'metro',
    output: 'static',
  },
  plugins: [
    'expo-router',
    [
      '@config-plugins/detox',
      {
        skipProguard: false,
        subdomains: ['10.0.2.2', 'localhost'],
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