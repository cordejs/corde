module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**/*.ts'],
  testMatch: ['**/tests/**/*.test.ts'],
  modulePathIgnorePatterns: ['./tests/mocks', './tests/manual_test'],
};
