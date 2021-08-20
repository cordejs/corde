import { Queue } from "../data-structures";
import { IAssertionProps, IGroup, ITest, TestFunctionType, VoidLikeFunction } from "../types";

/**
 * Contain all information of data collected from files in runtime test
 * collection.
 * @internal
 */
class TestCollector {
  private constructor() {
    this.isInsideGroupClausure = false;
    this.isInsideTestClausure = false;
    this.groups = [];
    this.beforeEachFunctions = new Queue();
    this.afterAllFunctions = new Queue();
    this.beforeStartFunctions = new Queue();
    this.afterEachFunctions = new Queue();

    this.testClousureFunction = new Queue();
    this.groupClousureFunction = new Queue();

    this.tests = [];
    this.assertions = [];
    this.isolatedFunctions = [];
    this.testsFunctions = [];
    this.testsPass = 0;
    this.testsFailed = 0;
  }

  private static _instance: TestCollector;
  isInsideGroupClausure: boolean;
  isInsideTestClausure: boolean;

  assertions: IAssertionProps[];
  tests: ITest[];
  groups: IGroup[];

  beforeStartFunctions: Queue<VoidLikeFunction>;
  afterAllFunctions: Queue<VoidLikeFunction>;
  beforeEachFunctions: Queue<VoidLikeFunction>;

  afterEachFunctions: Queue<VoidLikeFunction>;
  testsFunctions: TestFunctionType[];
  isolatedFunctions: TestFunctionType[];

  testsPass: number;
  testsFailed: number;

  private testClousureFunction: Queue<VoidLikeFunction>;
  private groupClousureFunction: Queue<VoidLikeFunction>;

  static getInstance() {
    if (!TestCollector._instance) {
      TestCollector._instance = new TestCollector();
    }
    return TestCollector._instance;
  }

  addTestFunction(testFunction: TestFunctionType) {
    if (testFunction) {
      if (this.isInsideGroupClausure || this.isInsideTestClausure) {
        this.testsFunctions.push(testFunction);
      } else {
        this.isolatedFunctions.push(testFunction);
      }
    }
  }

  isInsideTestClausureFunctions() {
    return this.testsFunctions && this.testsFunctions.length > 0;
  }

  hasIsolatedTestFunctions() {
    return this.isolatedFunctions && this.isolatedFunctions.length > 0;
  }

  cloneTestFunctions() {
    return this.testsFunctions.map((m) => m);
  }

  cloneIsolatedTestFunctions() {
    return this.isolatedFunctions.map((m) => m);
  }

  clearTestFunctions() {
    this.testsFunctions = [];
  }

  clearIsolatedTestFunctions() {
    this.isolatedFunctions = [];
  }

  cleanAll() {
    this.tests = [];
    this.testsFunctions = [];
    this.groups = [];
  }

  addToGroupClousure(fn: () => void | Promise<void>) {
    this.groupClousureFunction.enqueue(fn);
  }

  async executeGroupClojure() {
    return await this.groupClousureFunction?.executeWithCatchCollectAsync();
  }

  addToTestClousure(fn: () => void | Promise<void>) {
    this.testClousureFunction.enqueue(fn);
  }

  async executeTestClojure() {
    return await this.testClousureFunction?.executeWithCatchCollectAsync();
  }
}

const testCollector = TestCollector.getInstance();
export { testCollector };
