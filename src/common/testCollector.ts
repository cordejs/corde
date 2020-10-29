import { AssertionProps, Group, Test, testFunctionType } from "../types";
import { Queue } from "../utils";

type voidFunction = () => void;

/**
 * Contain all information of data collected from files in runtime test
 * collection.
 */
class TestCollector {
  /**
   * Defines if the system is collecting tests assertions from a file
   * @description This is used to tell node process the type of process that is
   * existing.
   */
  public isCollecting: boolean;

  /**
   * Defines if the thread running has a **group** function.
   */
  public hasGroup: boolean;

  /**
   * Defines if the thread running has a **test** function.
   */
  public hasTest: boolean;

  /**
   * List of assertions found in running file.
   * @description Assertions are the minor type of object in
   * position tree, but being the most important of all them.
   */
  public assertions: AssertionProps[];

  /**
   * List of tests found in running file.
   * @description Tests are the second in position of objects,
   * all tests are encapsulated inside groups in the end of processing.
   */
  public tests: Test[];

  /**
   * List of groups found in running file.
   *
   * @description Groups are the major object of the thread,
   * all tests and assertions are converted encapsulated in this in the end,
   * but not necessary all assertions need a group or a test, that is why
   * group name are optional
   */
  public groups: Group[];
  public beforeStartFunctions: Queue<voidFunction>;
  public afterAllFunctions: Queue<voidFunction>;
  public beforeEachFunctions: Queue<voidFunction>;

  public afterEachFunctions: Queue<voidFunction>;
  public testsFunctions: testFunctionType[];
  public isolatedFunctions: testFunctionType[];

  constructor() {
    this.groups = [];
    this.beforeEachFunctions = new Queue();
    this.afterAllFunctions = new Queue();
    this.beforeStartFunctions = new Queue();
    this.afterEachFunctions = new Queue();
    this.tests = [];
    this.assertions = [];
    this.isolatedFunctions = [];
    this.testsFunctions = [];
  }

  public addTestFunction(testFunction: testFunctionType) {
    if (testFunction) {
      if (this.hasGroup || this.hasTest) {
        this.testsFunctions.push(testFunction);
      } else {
        this.isolatedFunctions.push(testFunction);
      }
    }
  }

  public hasIsolatedTestFunctions() {
    return this.isolatedFunctions && this.isolatedFunctions.length > 0;
  }

  public cloneTestFunctions() {
    return this.testsFunctions.map((m) => m);
  }

  public cloneIsolatedTestFunctions() {
    return this.isolatedFunctions.map((m) => m);
  }

  public clearTestFunctions() {
    this.testsFunctions = [];
  }

  public clearIsolatedTestFunctions() {
    this.isolatedFunctions = [];
  }

  public cleanAll() {
    this.tests = [];
    this.testsFunctions = [];
    this.groups = [];
  }
}

const testCollector = new TestCollector();
export { testCollector };
