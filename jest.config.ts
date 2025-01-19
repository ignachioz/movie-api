import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/test'],
  modulePaths: ['<rootDir>'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

export default config;
