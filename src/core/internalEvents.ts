import { EventEmitter } from "stream";
import { TestFile } from "../common/TestFile";
import { ITestReport } from "../types";

export interface IInternalEvents extends EventEmitter {
  on(event: "test_end", fn: (report: ITestReport) => void): this;
  on(event: "suite_forced_fail", fn: (report: ITestReport) => void): this;
  on(event: "test_file_empty", fn: (testFile: TestFile) => void): this;

  emit(event: "test_end", report: ITestReport): boolean;
  emit(event: "suite_forced_fail", report: ITestReport): boolean;
  emit(event: "test_file_empty", testFile: TestFile): boolean;

  off(event: "test_end", listener: (report: ITestReport) => void): this;
  off(event: "suite_forced_fail", listener: (report: ITestReport) => void): this;
  off(event: "test_file_empty", listener: (testFile: TestFile) => void): this;

  removeListener(event: "test_end", listener: (report: ITestReport) => void): this;
  removeListener(event: "suite_forced_fail", listener: (report: ITestReport) => void): this;
  removeListener(event: "test_file_empty", listener: (testFile: TestFile) => void): this;
}
