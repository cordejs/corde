import { testCollector } from "../core/testCollector";
import { getStackTrace, isFunction } from "../utils";
import { hookBuilder } from "./hookBuilder";

export function afterEach(fn: () => void | Promise<void>, timeout?: number) {
  if (isFunction(fn)) {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addAfterEachHook(fn),
      fn,
      trace,
      errorTitle: "AfterEachError",
      timeout,
    });
  }
}
