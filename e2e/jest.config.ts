// Set TEST environment to avoid process to exit with code 1 inside aplicaton
process.env.ENV = "E2E";

module.exports = {
  rootDir: ".",
  verbose: false,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  restoreMocks: true,
  forceExit: true,
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
