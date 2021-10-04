import { testCollector } from "../core/testCollector";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

export const beforeEach: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
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
