import { testCollector } from "../core/testCollector";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

export function beforeEach(fn: () => void | Promise<void>, timeout?: number) {
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
}
