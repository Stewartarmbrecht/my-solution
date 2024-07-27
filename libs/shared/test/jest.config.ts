import path from 'path';

module.exports = {
  displayName: 'shared',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  rootDir: path.resolve(__dirname,'../'),
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['./test/test-setup.ts'],
  moduleNameMapper: {
    '\\.svg$': '@nx/expo/plugins/jest/svg-mock',
  },
  collectCoverageFrom: [
    `<rootDir>/src/**/*.{ts,tsx}`
  ],
  coverageDirectory: '<rootDir>/coverage/libs/shared',
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100,
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { configFile: path.resolve(__dirname, './babel.config.json') }],
  }
};