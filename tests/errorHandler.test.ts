import { initErrorHandlers } from "../src/errorHandler";
import { getFullConsoleLog } from "./testHelper";
import { mockProcessExit } from "jest-mock-process";
import { testCollector } from "../src/common";

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

  it("should call process.exit", () => {
    try {
      const mockExit = mockProcessExit();
      process.emit("uncaughtException", new Error("Error Test"));
      expect(mockExit).toHaveBeenCalledWith(1);
    } catch (error) {
      console.log(error);
    }
  });

  it("Should run all afterAllFunctions", () => {
    try {
      jest.spyOn(console, "log");
      let a = 1;
      testCollector.afterAllFunctions = [];
      testCollector.afterAllFunctions.push(() => (a = 2));
      process.emit("uncaughtException", new Error("Error Test"));
      expect(a).toEqual(2);
    } catch (error) {
      fail();
    }
  });
});
