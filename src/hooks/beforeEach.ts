import { STACK_TRACE_COUNT_LIMIT } from "../const";
import runtime from "../core/runtime";
import { getStackTrace } from "../utils/getStackTrace";
import { hookBuilder } from "./hookBuilder";

export const beforeEach: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
  const { testCollector } = runtime;

  if (typeof fn === "function") {
    const trace = getStackTrace(STACK_TRACE_COUNT_LIMIT);
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addBeforeEachHook(fn),
      fn,
      trace,
      errorTitle: "BeforeEach",
      timeout,
    });
  }
};
