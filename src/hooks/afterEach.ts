import { testCollector } from "../common/testCollector";
import { getStackTrace, isFunction } from "../utils";
import { hookBuilder } from "./hookBuilder";

export function afterEach(fn: () => void | Promise<void>, timeout?: number) {
  if (isFunction(fn)) {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: testCollector.currentTestFile.addAfterEachHook,
      fn,
      trace,
      errorTitle: "AfterEachError",
      timeout,
    });
  }
}
