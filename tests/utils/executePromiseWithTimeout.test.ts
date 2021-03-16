import { executePromiseWithTimeout } from "../../src/utils";

describe("testing executePromiseWithTimeout", () => {
  it("should execute a function in time", async () => {
    const num = await executePromiseWithTimeout<number>((resolve) => {
      resolve(1);
    }, 1000);

    expect(num).toEqual(1);
  });

  it("should reject", () => {
    expect(
      async () => await executePromiseWithTimeout((_, reject) => reject(), 1000),
    ).rejects.toBeTruthy();
  });

  it("should get timeout due to function not resolved or rejected", () => {
    expect(
      async () => await executePromiseWithTimeout((_, reject) => {}, 100),
    ).rejects.toBeTruthy();
  });

  it("should throw error due to no function", () => {
    expect(async () => await executePromiseWithTimeout(null, 1000)).rejects.toBeTruthy();
  });
});
