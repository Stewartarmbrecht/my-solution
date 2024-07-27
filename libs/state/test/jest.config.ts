module.exports = {
  displayName: 'state',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  rootDir: '../',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-redux|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['./test/test-setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  collectCoverageFrom: [
    './src/**/*.{ts,tsx}'
  ],
  coverageDirectory: '../../../coverage/libs/shared',
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100,
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: './test/babel.config.json' }],
  }
};
