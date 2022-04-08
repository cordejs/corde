/**
 * Tests id are used to specify tests in a local running
 * I.E: yarn e2e 1 will execute only tests of id 1
 */

import { ITestFile } from "./types";

export const testCases: ITestFile[] = [
  {
    id: 1,
    folder: "respond",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
    only: true,
  },
  // Don't know why this test is broken
  {
    id: 2,
    folder: "respond",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 1,
  },
  {
    id: 3,
    folder: "afterAll",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 4,
    folder: "afterAll",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 5,
    folder: "afterEach",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 6,
    folder: "afterEach",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 7,
    folder: "beforeEach",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 8,
    folder: "beforeEach",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 9,
    folder: "beforeAll",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 10,
    folder: "beforeAll",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 11,
    folder: "checkVersion",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
    isRequiredFunction: true,
  },
  {
    id: 12,
    folder: "sendMessage",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 13,
    folder: "toAddReaction",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 14,
    folder: "toAddReaction",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 1,
  },
  {
    id: 15,
    folder: "toDeleteRole",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 16,
    folder: "toDeleteRole",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 1,
  },
  {
    id: 17,
    folder: "toEditMessage",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
  {
    id: 18,
    folder: "toEditMessage",
    testFile: "test2.spec.ts",
    exitCodeExpectation: 1,
  },
  {
    id: 19,
    folder: "toHaveResult",
    testFile: "test1.spec.ts",
    exitCodeExpectation: 0,
  },
];
