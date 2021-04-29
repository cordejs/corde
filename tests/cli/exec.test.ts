import { reader } from "../../src/core/reader";
import * as validateFn from "../../src/cli/validate";
import { exec } from "../../src/cli/exec";
import { FileError } from "../../src/errors";
import { TestExecutor } from "../../src/core/testExecutor";
import { summary } from "../../src/core/summary";
import { mockProcess } from "../mocks";
import { runtime } from "../../src/environment";

jest.mock("ora", () => {
  const spinner = {
    stop: jest.fn(),
  };
  const start = () => spinner;
  const result = { start };
  return () => result;
});

jest.mock("../../src/core/testExecutor.ts");
TestExecutor.prototype.runTestsAndPrint = jest.fn().mockImplementation(() => Promise.resolve({}));

describe("testing default command", () => {
  it("should throw exception due to no files", async () => {
    const readerSpy = jest.spyOn(reader, "loadConfig");
    readerSpy.mockReturnValue({
      silent: true,
      botPrefix: "!",
      botTestId: "123123123",
      channelId: "123123123",
      cordeTestToken: "12312112312",
      guildId: "12312312",
      testFiles: [],
      botTestToken: "123123",
      timeout: 1000,
    });

    const validateSpy = jest.spyOn(validateFn, "validate");
    validateSpy.mockImplementation(() => null);

    try {
      await exec();
    } catch (error) {
      expect(error instanceof FileError).toBeTruthy();
    }
  });

  it("Should read a file folder", async () => {
    const exitMock = mockProcess.mockProcessExit();
    const readerSpy = jest.spyOn(reader, "loadConfig");
    runtime.loginBot = jest.fn().mockReturnValue(Promise.resolve());
    runtime.events.onceReady = jest.fn().mockReturnValue(Promise.resolve());
    summary.print = jest.fn().mockReturnValue("");
    const validateSpy = jest.spyOn(validateFn, "validate");

    validateSpy.mockImplementation(() => null);

    readerSpy.mockReturnValue({
      silent: true,
      botPrefix: "!",
      botTestId: "123123123",
      channelId: "123123123",
      cordeTestToken: "12312112312",
      guildId: "12312312",
      testFiles: ["tests/cli/testFolder"],
      botTestToken: "123123",
      timeout: 1000,
    });

    await exec();
    expect(exitMock).toBeCalledWith(0);
  });
});
