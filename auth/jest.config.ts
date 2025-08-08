import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom' for browser environments
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  modulePaths: [
    '<rootDir>/'
  ]
};

export default config;