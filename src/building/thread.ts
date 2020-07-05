import { AssertionProps, Group, Test, testFunctionType } from "../models";

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
   * Defines if the thread running has a **gruop** function.
   */
  public hasGroup: boolean;

  /**
   * Defines if the thread running has a **test** function.
   */
  public hasTest: boolean;

  /**
   * List of assertions found in running file.
   * @description Assetions are the minor type of object in
   * position tree, but being the most important of all them.
   */
  public assertions: AssertionProps[] = [];

  /**
   * List of tests found in running file.
   * @description Tests are the second in position of objects,
   * all tests are encapsulated inside groups in the end of processing.
   */
  public tests: Test[] = [];

  /**
   * List of groups found in running file.
   *
   * @description Groups are the major object of the thread,
   * all tests and assertions are converted encapsulated in this in the end,
   * but not necessary all assertions need a group or a test, that is why
   * group name are optional
   */
  public groups: Group[] = [];
  public beforeStartFunctions: voidFunction[] = [];
  public afterAllFunctions: voidFunction[] = [];

  private testsFunctions: testFunctionType[] = [];

  public addTestFunction(testFunction: testFunctionType) {
    if (testFunction) {
      this.testsFunctions.push(testFunction);
    }
  }

  public hasTestFunctions() {
    return this.testsFunctions && this.testsFunctions.length > 0;
  }

  public cloneTestFunctions() {
    return this.testsFunctions.map((test) => test);
  }

  public cleanTestFunctions() {
    this.testsFunctions = [];
  }
}

const testCollector = new TestCollector();
export { testCollector };
