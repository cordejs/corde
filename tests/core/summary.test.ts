import { summary } from "../../src/core";
import { RunnerReport } from "../../src/types";
import { removeANSIColorStyle } from "../testHelper";

it("should print a summary for 1 test file, 1 test case, and 1 test function that has pass", () => {
  const summaryData: RunnerReport = {
    testTimer: "2s",
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 1,
    totalTests: 1,
    totalTestsFailed: 0,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 1,
    totalEmptyTests: 1,
  };

  const message = summary.print(summaryData);
  expect(removeANSIColorStyle(message)).toMatchSnapshot();
});

it("should print a summary for 1 test file, 1 test case, and 1 test function that has pass, and 1 that don't", () => {
  const summaryData: RunnerReport = {
    testTimer: "2s",
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 1,
    totalTests: 2,
    totalTestsFailed: 1,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  };

  const message = summary.print(summaryData);
  expect(removeANSIColorStyle(message)).toMatchSnapshot();
});

it("should print a summary for 10 test file, 10 test case, and 10 test functions", () => {
  const summaryData: RunnerReport = {
    testTimer: "2s",
    totalTestFiles: 10,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 10,
    totalTests: 10,
    totalTestsFailed: 0,
    totalTestsPassed: 10,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  };

  const message = summary.print(summaryData);
  expect(removeANSIColorStyle(message)).toMatchSnapshot();
});

it("should print a summary tests with timer ''", () => {
  const summaryData: RunnerReport = {
    testTimer: "",
    totalTestFiles: 10,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 10,
    totalTests: 10,
    totalTestsFailed: 0,
    totalTestsPassed: 10,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  };

  const message = summary.print(summaryData);
  expect(removeANSIColorStyle(message)).toMatchSnapshot();
});

it("should print a summary tests with fail, success and empty", () => {
  const summaryData: RunnerReport = {
    testTimer: "10.658s",
    totalTestFiles: 3,
    totalTestFilesFailed: 1,
    totalTestFilesPassed: 1,
    totalTests: 3,
    totalTestsFailed: 1,
    totalTestsPassed: 1,
    totalEmptyTestFiles: 1,
    totalEmptyTests: 1,
  };

  const message = summary.print(summaryData);
  expect(removeANSIColorStyle(message)).toMatchSnapshot();
});

it("should print a summary tests with only fail", () => {
  const summaryData: RunnerReport = {
    testTimer: "10.658s",
    totalTestFiles: 3,
    totalTestFilesFailed: 3,
    totalTestFilesPassed: 0,
    totalTests: 3,
    totalTestsFailed: 3,
    totalTestsPassed: 0,
    totalEmptyTestFiles: 0,
    totalEmptyTests: 0,
  };

  const message = summary.print(summaryData);
  expect(removeANSIColorStyle(message)).toMatchSnapshot();
});

it("should print a summary tests with only empty", () => {
  const summaryData: RunnerReport = {
    testTimer: "10.658s",
    totalTestFiles: 1,
    totalTestFilesFailed: 0,
    totalTestFilesPassed: 0,
    totalTests: 1,
    totalTestsFailed: 0,
    totalTestsPassed: 0,
    totalEmptyTestFiles: 1,
    totalEmptyTests: 1,
  };

  const message = summary.print(summaryData);
  expect(removeANSIColorStyle(message)).toMatchSnapshot();
});
