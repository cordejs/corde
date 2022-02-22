// Set TEST environment to avoid process to exit with code 1 inside application
process.env.ENV = "UNITY_TEST";
process.env.CORDE_DEBUG_MODE = "true";

module.exports = {
  rootDir: ".",
  verbose: false,
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "node",
  collectCoverageFrom: ["./src/**/*.ts"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>", "./tests/fixtures"],
  moduleDirectories: ["./tests/fixtures", "node_modules"],
  modulePathIgnorePatterns: ["./tests/mocks", "./tests/manual_test", "./tests/dirTestFiles"],
  projects: ["<rootDir>/tests"],
  restoreMocks: true,
  forceExit: true,
  globals: {
    "ts-jest": {
      babelConfig: "./babel.config.js",
      tsConfig: "./tests/tsconfig.json",
    },
  },
  transform: {
    "^.+\\.ts?$": "babel-jest",
  },
};
