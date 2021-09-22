import { Queue } from "../data-structures";
import { IAssertionProps, VoidLikeFunction } from "../types";
import { TestFile } from "./TestFile";

/**
 * Contain all information of data collected from files in runtime test
 * collection.
 * @internal
 */
class TestCollector {
  isInsideGroupClausure: boolean;
  isInsideTestClausure: boolean;

  assertions: IAssertionProps[];

  testsPass: number;
  testsFailed: number;

  testFiles: TestFile[];

  private static _instance: TestCollector;
  private groupClousureFunction: Queue<VoidLikeFunction>;

  get currentTestFile() {
    return this.testFiles[this.testFiles.length - 1];
  }

  private constructor() {
    this.testFiles = [];
    this.isInsideGroupClausure = false;
    this.isInsideTestClausure = false;

    this.assertions = [];
    this.testsPass = 0;
    this.testsFailed = 0;
    this.groupClousureFunction = new Queue();
  }

  createTestFile(filePath: string) {
    this.testFiles.push(new TestFile(filePath));
    return this.currentTestFile;
  }

  static getInstance() {
    if (!TestCollector._instance) {
      TestCollector._instance = new TestCollector();
    }
    return TestCollector._instance;
  }

  addToGroupClousure(fn: () => void | Promise<void>) {
    this.groupClousureFunction.enqueue(fn);
  }

  executeGroupClojure() {
    return this.groupClousureFunction?.executeWithCatchCollectAsync();
  }
}

const testCollector = TestCollector.getInstance();
export { testCollector };
