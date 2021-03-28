// Set TEST environment to avoid process to exit with code 1 inside aplicaton
process.env.ENV = "E2E_TEST";

module.exports = {
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testTimeout: 30000,
  globalSetup: "./setup.ts",
  globalTeardown: "./teardown.ts",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["__cordeTest__"],
  restoreMocks: true,
  forceExit: true,
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
