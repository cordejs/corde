import { testCollector } from "../core/TestCollector";
import { getStackTrace, isFunction } from "../utils";
import { hookBuilder } from "./hookBuilder";

export const beforeAll: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
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
};
