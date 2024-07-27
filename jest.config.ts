import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: [
    ...(await getJestProjectsAsync()),
    '<rootDir>/libs/features/test/jest.config.ts',
    '<rootDir>/libs/state/test/jest.config.ts',
    '<rootDir>/libs/shared/test/jest.config.ts',
  ],
});