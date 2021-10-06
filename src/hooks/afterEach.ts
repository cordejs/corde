import { testCollector } from "../core/TestCollector";
import { getStackTrace, isFunction } from "../utils";
import { hookBuilder } from "./hookBuilder";

export const afterEach: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
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
};
