import { once } from "events";
import { cordeInternal } from "../../src/api";
import runtime from "../../src/core";

describe("testing fail function", () => {
  it("should emit event for failed test", async () => {
    const event = once(runtime.internalEvents, "suite_forced_fail");
    runtime.testCollector.isInsideTestClosure = true;
    cordeInternal.fail("error");
    const [result] = await event;
    expect(result).toMatchObject({
      message: "Failed: error",
      pass: false,
    });
  });
});
