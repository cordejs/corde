// Set TEST environment to avoid process to exit with code 1 inside aplicaton
module.exports = {
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  testTimeout: 20000,
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
