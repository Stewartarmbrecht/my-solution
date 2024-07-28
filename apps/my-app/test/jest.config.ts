import path from 'path';

module.exports = {
  displayName: 'my-app',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  rootDir: path.resolve(__dirname,'../'),
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['./test/test-setup.tsx'],
  moduleNameMapper: {
    '\\.svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  collectCoverageFrom: [
    `<rootDir>/src/**/*.{ts,tsx}`
  ],
  coverageDirectory: '<rootDir>/../../coverage/libs/shared',
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100,
    },
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-redux)"
  ],
  // transformIgnorePatterns: [
  //   'node_modules/(?!react-redux|@react-native|expo(nent)?|react-native|@react-navigation)',
  // ],
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: path.resolve(__dirname, './babel.config.js') }],
  }
};
