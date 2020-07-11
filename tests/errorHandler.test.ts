import { initErrorHandlers } from "../src/errorHandler";
import { getFullConsoleLog } from "./testHelper";
import { mockProcessExit } from "jest-mock-process";
import { testCollector } from "../src/common";

const spy = jest.spyOn(console, "error");
const mockExit = mockProcessExit();
describe("Testing errorHandler", () => {
  beforeAll(() => {
    initErrorHandlers();
  });
  afterEach(() => {
    mockExit.mockClear();
    spy.mockClear();
    testCollector.afterAllFunctions = undefined;
  });
  it("Should get uncaughtException and print it", () => {
    process.emit("uncaughtException", new Error("Error Test"));
    expect(getFullConsoleLog(spy.mock.calls)).toContain("Error Test");
  });

  it("Should get unhandledRejection and print it", () => {
    process.emit("unhandledRejection", new Error("Error Test"), Promise.reject("Fail"));
    expect(getFullConsoleLog(spy.mock.calls)).toContain("Error Test");
  });

  it("Should get uncaughtExceptionMonitor and print it", () => {
    process.emit("uncaughtExceptionMonitor", new Error("Error Test"));
    expect(getFullConsoleLog(spy.mock.calls)).toContain("Error Test");
  });

  it("Should call process.exit", () => {
    process.emit("uncaughtException", new Error("Error Test"));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it("Should run all afterAllFunctions", () => {
    let a = 1;
    testCollector.afterAllFunctions = [];
    testCollector.afterAllFunctions.push(() => (a = 2));
    process.emit("uncaughtException", new Error("Error Test"));
    expect(a).toEqual(2);
  });
});
