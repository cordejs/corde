import runtime from "../core/runtime";
import { getStackTrace } from "../utils/getStackTrace";
import { hookBuilder } from "./hookBuilder";

export const afterAll: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
  const { testCollector } = runtime;
  if (typeof fn === "function") {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addAfterAllHook(fn),
      fn,
      trace,
      errorTitle: "AfterAll",
      timeout,
    });
  }
};
