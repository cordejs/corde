import { executeWithTimeout } from "../../src/utils";

describe("testing executeWithTimeout function", () => {
  it("should execute normal function", async () => {
    let a = 1;
    await executeWithTimeout(() => (a = 2), 100);
    expect(a).toBe(2);
  });

  it("should execute promise function", async () => {
    let a = 1;
    await executeWithTimeout(() => Promise.resolve((a = 2)), 100);
    expect(a).toBe(2);
  });

  it("should throw exception for an null function", async () => {
    expect(executeWithTimeout(null, 1)).rejects.toThrow();
  });

  it("should execute ok", async () => {
    const fn = () => Promise.resolve(2);
    const response = await executeWithTimeout(async () => await fn(), 100);
    expect(response).toEqual(2);
  });
});
