import { wait } from "../../src/utils/wait";
import { performance } from "perf_hooks";

describe("testing wait function", () => {
  it("should wait for a time", async () => {
    const start = performance.now();
    await wait(100);
    const end = performance.now();
    expect(start - end).toBeLessThan(100);
  });

  it("should throw error due to negative value", async () => {
    await expect(wait(-1)).rejects.toThrowError();
  });
  it("should throw error due to invalid value", async () => {
    // @ts-expect-error
    await expect(wait(null)).rejects.toThrowError();
  });
});
