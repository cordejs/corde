import { once } from "events";
import { fail as _fail } from "../../src/api";
import { runtime } from "../../src/core/runtime";

describe("testing fail function", () => {
  it("should emit event for failed test", async () => {
    const event = once(runtime.internalEvents, "suite_forced_fail");
    _fail("error");
    const [result] = await event;
    expect(result).toMatchObject({
      message: "Failed: error",
      pass: false,
    });
  });
});
