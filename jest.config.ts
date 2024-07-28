import { getJestProjects } from '@nx/jest';

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/features/test/jest.config.ts',
    '<rootDir>/libs/state/test/jest.config.ts',
    '<rootDir>/libs/shared/test/jest.config.ts',
    '<rootDir>/apps/my-app/test/jest.config.ts',
  ],
};