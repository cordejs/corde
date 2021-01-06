// Set TEST environment to avoid process to exit with code 1 inside aplicaton
process.env.ENV = "TEST";

module.exports = {
  rootDir: ".",
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["./src/**/*.ts"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["./tests/mocks", "./tests/manual_test", "./tests/dirTestFiles"],
  projects: ["<rootDir>/tests"],
  restoreMocks: true,
  forceExit: true,
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
