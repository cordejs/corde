import testUtils from "../testUtils";

// the e2e engine expect a testFn to be exported from a test module
export function testFn() {
  return testUtils.runCLI("-v", false);
}
