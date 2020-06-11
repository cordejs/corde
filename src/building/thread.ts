import { AssertionProps, Group, Test, testFunctionType } from '../models';

type voidFunction = () => void;

/**
 * Contain all information of data collected from files in runtime test
 * collection.
 */
export default class Thread {
  /**
   * Defines if the system is collecting tests assertions from a file
   * @description This is used to tell node process the type of process that is
   * existing.
   */
  static isBuildRunning: boolean;
  /**
   * Defines if the thread running has a **gruop** function.
   */
  static hasGroup: boolean;
  /**
   * Defines if the thread running has a **test** function.
   */
  static hasTest: boolean;
  /**
   * List of assertions found in running file.
   * @description Assetions are the minor type of object in
   * position tree, but being the most important of all them.
   */
  static assertions: AssertionProps[] = [];

  static testsFunctions: testFunctionType[] = [];
  /**
   * List of tests found in running file.
   * @description Tests are the second in position of objects,
   * all tests are encapsulated inside groups in the end of processing.
   */
  static tests: Test[] = [];
  /**
   * List of groups found in running file.
   * @description Groups are the major object of the thread,
   * all tests and assertions are converted encapsulated in this in the end,
   * but not necessary all assertions need a group or a test, that is why
   * group name are optional
   */
  static groups: Group[] = [];
  static beforeStartFunctions: voidFunction[] = [];
  static afterAllFunctions: voidFunction[] = [];
}
