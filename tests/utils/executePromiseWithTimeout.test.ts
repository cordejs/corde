import { TimeoutError } from "../../src/errors";
import { executePromiseWithTimeout, wait } from "../../src/utils";

describe("testing executePromiseWithTimeout", () => {
  it("should execute a function in time", async () => {
    const num = await executePromiseWithTimeout<number>((resolve) => {
      resolve(1);
    }, 1000);

    expect(num).toEqual(1);
  });

  it("should reject", async () => {
    try {
      await executePromiseWithTimeout((_, reject) => reject("self rejection"), 1000);
      fail();
    } catch (error) {
      expect(error).toEqual("self rejection");
    }
  });

  it("should get timeout due to function not resolved or rejected", async () => {
    expect(async () => await executePromiseWithTimeout(() => {}, 100)).rejects.toBeTruthy();
  });

  it("should throw error due to no function", async () => {
    try {
      await executePromiseWithTimeout(null, 1000);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("should throw a error with a data", async () => {
    try {
      await executePromiseWithTimeout(
        async () => {
          await wait(2000);
        },
        1000,
        "test",
      );
      fail();
    } catch (error) {
      expect(error).toEqual(new TimeoutError("timeout", "test"));
    }
  });
});
