const IS_PROD = process.env.APP_VARIANT === 'prod';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

export default {
  name: IS_PROD ? 'MyApp' : (IS_PREVIEW ? 'MyApp (Preview)' : 'MyApp (Dev)'),
  slug: 'my-app',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  }, 
  "updates": {
    "url": "https://u.expo.dev/6acee1bd-6d1e-43d9-8d31-e2bb31408361"
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_PROD ? 'com.stewartarmbrecht.myapp' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.myapp.preview' : 'com.stewartarmbrecht.myapp.dev'),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_PROD ? 'com.stewartarmbrecht.myapp' : 
      (IS_PREVIEW ? 'com.stewartarmbrecht.myapp.preview' : 'com.stewartarmbrecht.myapp.dev'),
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      '@config-plugins/detox',
      {
        skipProguard: false,
        subdomains: ['10.0.2.2', 'localhost'],
      },
    ],
  ],
  extra: {
    // This is the project ID from the previous step
    eas: {
      projectId: '6acee1bd-6d1e-43d9-8d31-e2bb31408361',
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};