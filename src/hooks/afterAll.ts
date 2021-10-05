import { testCollector } from "../core/TestCollector";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

export const afterAll: corde.IHook = (fn: () => void | Promise<void>, timeout?: number) => {
  if (typeof fn === "function") {
    const trace = getStackTrace();
    hookBuilder({
      hookHandler: (fn) => testCollector.currentTestFile.addAfterAllHook(fn),
      fn,
      trace,
      errorTitle: "AfterAllError",
      timeout,
    });
  }
};
