import runtime from "../core/runtime";
import { isFunction } from "../utils/isFunction";
import { getStackTrace } from "../utils/getStackTrace";
import { hookBuilder } from "./hookBuilder";

export const afterEach: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
  const { testCollector } = runtime;
  if (isFunction(fn)) {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addAfterEachHook(fn),
      fn,
      trace,
      errorTitle: "AfterEach",
      timeout,
    });
  }
};
