import { initErrorHandlers } from "../src/errorHandler";
import { getFullConsoleLog } from "./testHelper";
import { mockProcessExit } from "jest-mock-process";
import { testCollector, runtime } from "../src/common";
import { Queue } from "../src/utils";

initErrorHandlers();
describe("Testing errorHandler", () => {
  beforeAll(() => {
    initErrorHandlers();
  });
  afterEach(() => {
    testCollector.afterAllFunctions = undefined;
  });
  it("Should get uncaughtException and print it", () => {
    try {
      const spy = jest.spyOn(console, "log");
      process.emit("uncaughtException", new Error("Error Test"));
      expect(getFullConsoleLog(spy.mock.calls)).toContain("Error Test");
    } catch (error) {
      fail();
    }
  });

  it("Should get unhandledRejection and print it", () => {
    try {
      const spy = jest.spyOn(console, "log");
      process.emit("unhandledRejection", new Error("Error Test"), Promise.reject("Fail"));
      expect(getFullConsoleLog(spy.mock.calls)).toContain("Error Test");
    } catch (error) {
      fail();
    }
  });

  it("Should get uncaughtExceptionMonitor and print it", () => {
    try {
      const spy = jest.spyOn(console, "log");
      process.emit("uncaughtExceptionMonitor", new Error("Error Test"));
      expect(getFullConsoleLog(spy.mock.calls)).toContain("Error Test");
    } catch (error) {
      fail();
    }
  });

  it("should call process.exit with a generic error message due to no one was provided", () => {
    try {
      const mockExit = mockProcessExit();
      const spy = jest.spyOn(console, "log");
      process.emit("uncaughtException", new Error("Error Test"));
      expect(mockExit).toHaveBeenCalledWith(1);
      expect(getFullConsoleLog(spy.mock.calls)).toContain("Unknown error");
    } catch (error) {
      console.log(error);
    }
  });

  it("should call logout when a error is thrown", () => {
    runtime.isBotLoggedIn = jest.fn().mockReturnValue(true);
    const spy = jest.spyOn(runtime, "logoffBot");
    process.emit("uncaughtException", new Error("Error Test"));
    expect(spy).toBeCalled();
  });

  it("should exit the process with code 1 when is not test", () => {
    runtime.isBotLoggedIn = jest.fn().mockReturnValue(true);
    const mockExit = mockProcessExit();
    process.env.ENV = "PROD";
    process.emit("uncaughtException", new Error("Error Test"));
    expect(mockExit).toBeCalledWith(1);
    process.env.ENV = "TEST";
  });

  it("should call process.exit", () => {
    try {
      const mockExit = mockProcessExit();
      const error = new Error("Error Test");
      error.name = null;
      process.emit("uncaughtException", error);
      expect(mockExit).toHaveBeenCalledWith(1);
    } catch (error) {
      console.log(error);
    }
  });

  it("Should run all afterAllFunctions", () => {
    try {
      jest.spyOn(console, "log");
      let a = 1;
      testCollector.afterAllFunctions = new Queue();
      testCollector.afterAllFunctions.enqueue(() => (a = 2));
      process.emit("uncaughtException", new Error("Error Test"));
      expect(a).toEqual(2);
    } catch (error) {
      fail();
    }
  });
});
