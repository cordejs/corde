import Utils from "../../src/utils/utils";
import { performance } from "perf_hooks";

describe("Testing pick function", () => {
  it("Should pick only a property", () => {
    const obj = {
      id: "1",
      name: "name",
    };
    const newObj = Utils.pick(obj, "name");
    expect(newObj).toEqual({ id: undefined, name: "name" });
  });

  it("should wait for a time", async () => {
    const start = performance.now();
    await Utils.wait(100);
    const end = performance.now();
    expect(start - end).toBeLessThan(100);
  });

  it("should throw error due to negative value", async () => {
    await expect(Utils.wait(-1)).rejects.toThrowError();
  });
  it("should throw error due to invalid value", async () => {
    await expect(Utils.wait(null)).rejects.toThrowError();
  });
});
