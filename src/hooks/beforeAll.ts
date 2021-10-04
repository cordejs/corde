import { testCollector } from "../core/testCollector";
import { getStackTrace, isFunction } from "../utils";
import { hookBuilder } from "./hookBuilder";

export function beforeAll(fn: () => void | Promise<void>, timeout?: number) {
  if (isFunction(fn)) {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addBeforeAllHook(fn),
      fn,
      trace,
      errorTitle: "BeforeAllError",
      timeout,
    });
  }
}
