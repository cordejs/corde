import { testCollector } from "../common/testCollector";
import { getStackTrace } from "../utils";
import { hookBuilder } from "./hookBuilder";

export function afterEach(fn: () => void | Promise<void>, timeout?: number) {
  if (typeof fn === "function") {
    const trace = getStackTrace();
    hookBuilder({
      queueToAdd: testCollector.afterEachFunctions,
      fn,
      trace,
      errorTitle: "AfterEachError",
      timeout,
    });
  }
}
