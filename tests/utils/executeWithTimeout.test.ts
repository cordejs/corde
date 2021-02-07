import { executeWithTimeout } from "../../src/utils";

describe("testing executeWithTimeout function", () => {
  test("should execute normal function", async () => {
    let a = 1;
    await executeWithTimeout(() => (a = 2), 100);
    expect(a).toBe(2);
  });

  test("should execute promise function", async () => {
    let a = 1;
    await executeWithTimeout(() => Promise.resolve((a = 2)), 100);
    expect(a).toBe(2);
  });

  test("should throw exception for an null function", async () => {
    expect(executeWithTimeout(null, 1)).rejects.toThrow();
  });

  test("should fail in execution of async function", async () => {
    expect(
      executeWithTimeout(
        () =>
          new Promise<string>((resolve) => {
            setTimeout(() => {
              resolve("ok");
            }, 1000);
          }),
        100,
      ),
    ).rejects.toThrow("timeout");
  });
});
