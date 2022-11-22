import runtime from "../core/runtime";
import { isFunction } from "../utils/isFunction";
import { getStackTrace } from "../utils/getStackTrace";
import { hookBuilder } from "./hookBuilder";
import { STACK_TRACE_COUNT_LIMIT } from "../const";

export const afterEach: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
  const { testCollector } = runtime;
  if (isFunction(fn)) {
    const trace = getStackTrace(STACK_TRACE_COUNT_LIMIT);
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addAfterEachHook(fn),
      fn,
      trace,
      errorTitle: "AfterEach",
      timeout,
    });
  }
};
