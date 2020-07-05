import { AssertionProps, Group, Test, testFunctionType } from '../models';

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
  isCollecting: boolean;

  /**
   * Defines if the thread running has a **gruop** function.
   */
  hasGroup: boolean;

  /**
   * Defines if the thread running has a **test** function.
   */
  hasTest: boolean;

  /**
   * List of assertions found in running file.
   * @description Assetions are the minor type of object in
   * position tree, but being the most important of all them.
   */
  assertions: AssertionProps[] = [];

  /**
   * List of tests found in running file.
   * @description Tests are the second in position of objects,
   * all tests are encapsulated inside groups in the end of processing.
   */
  tests: Test[] = [];

  /**
   * List of groups found in running file.
   *
   * @description Groups are the major object of the thread,
   * all tests and assertions are converted encapsulated in this in the end,
   * but not necessary all assertions need a group or a test, that is why
   * group name are optional
   */
  groups: Group[] = [];
  beforeStartFunctions: voidFunction[] = [];
  afterAllFunctions: voidFunction[] = [];

  private testsFunctions: testFunctionType[] = [];

  addTestFunction(testFunction: testFunctionType) {
    if (testFunction) {
      this.testsFunctions.push(testFunction);
    }
  }

  hasTestFunctions() {
    return this.testsFunctions && this.testsFunctions.length > 0;
  }

  cloneTestFunctions() {
    return this.testsFunctions.map((test) => test);
  }

  cleanTestFunctions() {
    this.testsFunctions = [];
  }
}

const testCollector = new TestCollector();
export { testCollector };
