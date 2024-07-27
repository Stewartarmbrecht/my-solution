module.exports = {
  displayName: 'shared',
  resolver: '@nx/jest/plugins/resolver',
  preset: 'jest-expo',
  rootDir: '../',
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
