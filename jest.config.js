module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**/*.ts'],
  testMatch: ['**/tests/**/*.test.ts'],
};
