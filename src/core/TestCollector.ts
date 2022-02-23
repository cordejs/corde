import { Queue } from "../data-structures";
import { IAssertionProps, ITest, VoidLikeFunction } from "../types";
import { TestFile } from "./TestFile";

/**
 * Contain all information of data collected from files in runtime test
 * collection.
 * @internal
 */
export class TestCollector {
  /**
   * Define is Node.js is running a group(describe) closure.
   *
   * *This value must be set by the closure itself*
   *
   * @example
   *
   *                // isInsideTestClosure = false;
   * group("", () => {
   *  ...           // isInsideTestClosure = true;
   * });
   */
  isInsideGroupClosure: boolean;

  /**
   * Define is Node.js is running a test(it) closure.
   *
   * *This value must be set by the closure itself*
   *
   * @example
   *
   *                // isInsideTestClosure = false;
   * it("", () => {
   *  ...           // isInsideTestClosure = true;
   * });
   */
  isInsideTestClosure: boolean;
  assertions: IAssertionProps[];
  testsPass: number;
  testsFailed: number;
  testFiles: TestFile[];
  currentSuite!: ITest;

  private groupClosureFunction: Queue<VoidLikeFunction>;

  get currentTestFile() {
    return this.testFiles[this.testFiles.length - 1];
  }

  constructor() {
    this.testFiles = [];
    this.isInsideGroupClosure = false;
    this.isInsideTestClosure = false;

    this.assertions = [];
    this.testsPass = 0;
    this.testsFailed = 0;
    this.groupClosureFunction = new Queue();
  }

  clearTestFiles() {
    this.testFiles = [];
  }

  createTestFile(filePath: string) {
    this.testFiles.push(new TestFile(filePath));
    return this.currentTestFile;
  }

  addToGroupClosure(fn: () => void | Promise<void>) {
    this.groupClosureFunction.enqueue(fn);
  }

  executeGroupClojure() {
    return this.groupClosureFunction?.executeWithCatchCollectAsync();
  }
}
