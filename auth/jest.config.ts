import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  modulePaths: [
    '<rootDir>/'
  ],
  coverageReporters: ['json', 'lcov', 'text'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/configs/',
    '<rootDir>/src/main/middlewares',
  ],
};

export default config;