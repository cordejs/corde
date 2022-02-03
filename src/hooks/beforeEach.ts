import runtime from "../core/runtime";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

export const beforeEach: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
  const { testCollector } = runtime;

  if (typeof fn === "function") {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addBeforeEachHook(fn),
      fn,
      trace,
      errorTitle: "BeforeEachError",
      timeout,
    });
  }
};
