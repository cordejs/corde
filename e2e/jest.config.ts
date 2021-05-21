// Set TEST environment to avoid process to exit with code 1 inside aplicaton
process.env.ENV = "E2E_TEST";

module.exports = {
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  testTimeout: 10000,
  globalSetup: "./setup.ts",
  globalTeardown: "./teardown.ts",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["__cordeTest__"],
  restoreMocks: true,
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
