import { testCollector } from "../common/testCollector";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

export function beforeEach(fn: () => void | Promise<void>, timeout?: number) {
  if (typeof fn === "function") {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: testCollector.currentTestFile.addBeforeEachHook,
      fn,
      trace,
      errorTitle: "BeforeEachError",
      timeout,
    });
  }
}
