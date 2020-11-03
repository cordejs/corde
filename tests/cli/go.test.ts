import reader from "../../src/core/reader";
import * as validateFn from "../../src/cli/validate";
import { go } from "../../src/cli/go";
import { FileError } from "../../src/errors";
import { runtime } from "../../src/common";
import { BehaviorSubject } from "rxjs";
import * as executeTests from "../../src/core/runner";
import { Group } from "../../src/types";

describe("testing go command", () => {
  it("should throw exception due to no files", async () => {
    const readerSpy = jest.spyOn(reader, "loadConfig");
    readerSpy.mockReturnValue({
      botPrefix: "!",
      botTestId: "123123123",
      channelId: "123123123",
      cordeTestToken: "12312112312",
      guildId: "12312312",
      testFiles: [],
      botTestToken: "123123",
      timeOut: 1000,
    });

    const validateSpy = jest.spyOn(validateFn, "validate");
    validateSpy.mockImplementation(() => null);

    try {
      await go();
    } catch (error) {
      expect(error instanceof FileError).toBeTruthy();
    }
  });

  it("Should read a file folder", async () => {
    const readerSpy = jest.spyOn(reader, "loadConfig");
    const testObservable = new BehaviorSubject<boolean>(true);
    runtime.loginBot = jest.fn().mockImplementation(() => {});
    jest.spyOn(executeTests, "executeTestCases").mockImplementation((groups: Group[]) => {
      return Promise.resolve();
    });
    runtime.onBotStart = () => testObservable.asObservable();

    const validateSpy = jest.spyOn(validateFn, "validate");
    validateSpy.mockImplementation(() => null);

    readerSpy.mockReturnValue({
      botPrefix: "!",
      botTestId: "123123123",
      channelId: "123123123",
      cordeTestToken: "12312112312",
      guildId: "12312312",
      testFiles: ["tests/cli/testFolder"],
      botTestToken: "123123",
      timeOut: 1000,
    });

    // @ts-ignore
    const processSpy = jest.spyOn(process, "exit").mockImplementation(() => {});

    await go();

    expect(processSpy).toBeCalledWith(0);
  });
});
