import { Queue } from "../data-structures";
import { IAssertionProps, ITest, VoidLikeFunction } from "../types";
import { TestFile } from "./TestFile";

/**
 * Contain all information of data collected from files in runtime test
 * collection.
 * @internal
 */
export class TestCollector {
  isInsideGroupClausure: boolean;
  isInsideTestClausure: boolean;
  assertions: IAssertionProps[];
  testsPass: number;
  testsFailed: number;
  testFiles: TestFile[];
  currentSuite!: ITest;

  private groupClousureFunction: Queue<VoidLikeFunction>;

  get currentTestFile() {
    return this.testFiles[this.testFiles.length - 1];
  }

  constructor() {
    this.testFiles = [];
    this.isInsideGroupClausure = false;
    this.isInsideTestClausure = false;

    this.assertions = [];
    this.testsPass = 0;
    this.testsFailed = 0;
    this.groupClousureFunction = new Queue();
  }

  clearTestFiles() {
    this.testFiles = [];
  }

  createTestFile(filePath: string) {
    this.testFiles.push(new TestFile(filePath));
    return this.currentTestFile;
  }

  addToGroupClousure(fn: () => void | Promise<void>) {
    this.groupClousureFunction.enqueue(fn);
  }

  executeGroupClojure() {
    return this.groupClousureFunction?.executeWithCatchCollectAsync();
  }
}
