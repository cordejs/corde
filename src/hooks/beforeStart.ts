import { testCollector } from "../common/testCollector";
import { getStackTrace, isFunction } from "../utils";
import { hookBuilder } from "./hookBuilder";

export function beforeStart(fn: () => void | Promise<void>, timeout?: number) {
  if (isFunction(fn)) {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: testCollector.currentTestFile.addBeforeStartHook,
      fn,
      trace,
      errorTitle: "BeforeStartError",
      timeout,
    });
  }
}
