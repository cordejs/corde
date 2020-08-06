// Set TEST environment to avoid process to exit with code 1 inside aplicaton
process.env.ENV = "TEST";

module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["./src/**/*.ts"],
  testMatch: ["**/tests/**/*.test.ts"],
  modulePathIgnorePatterns: ["./tests/mocks", "./tests/manual_test", "./tests/dirTestFiles"],
  restoreMocks: true,
  forceExit: true,
};
