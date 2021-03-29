import { Queue } from "../data-structures";
import { AssertionProps, Group, Test, TestFunctionType, VoidLikeFunction } from "../types/types";

/**
 * Contain all information of data collected from files in runtime test
 * collection.
 * @internal
 */
class TestCollector {
  /**
   * Defines if the system is collecting tests assertions from a file
   * @description This is used to tell node process the type of process that is
   * existing.
   */
  isCollecting: boolean;

  /**
   * Defines if the running function is being executed inside a **group**.
   * clausure
   */
  isInsideGroupClausure: boolean;

  /**
   * Defines if the running function is being executed inside a **testClausure**.
   */
  isInsideTestClausure: boolean;

  /**
   * List of assertions found in running file.
   * @description Assertions are the minor type of object in
   * position tree, but being the most important of all them.
   */
  assertions: AssertionProps[];

  /**
   * List of tests found in running file.
   * @description Tests are the second in position of objects,
   * all tests are encapsulated inside groups in the end of processing.
   */
  tests: Test[];

  /**
   * List of groups found in running file.
   *
   * @description Groups are the major object of the thread,
   * all tests and assertions are converted encapsulated in this in the end,
   * but not necessary all assertions need a group or a test, that is why
   * group name are optional
   */
  groups: Group[];

  beforeStartFunctions: Queue<VoidLikeFunction>;
  afterAllFunctions: Queue<VoidLikeFunction>;
  beforeEachFunctions: Queue<VoidLikeFunction>;

  afterEachFunctions: Queue<VoidLikeFunction>;
  testsFunctions: TestFunctionType[];
  isolatedFunctions: TestFunctionType[];

  private testClousureFunction: Queue<VoidLikeFunction>;
  private groupClousureFunction: Queue<VoidLikeFunction>;

  constructor() {
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

const testCollector = new TestCollector();
export { testCollector };
