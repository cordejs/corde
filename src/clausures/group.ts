import { runtime, testCollector } from "../common";
import { VoidLikeFunction } from "../types";
import { executePromiseWithTimeout, resolveName } from "../utils";

/**
 * Create a group of tests.
 *
 * @param descriptionDefinition Resolvable description of the group. It is offen a string,
 * but can be sync of async functions, numbers, booleans... Functions will be executed to get the
 * primitive value of then.
 *
 * @param testDefinitions Function for Corde to invoke that will define inner suites a test
 * @param timeout Custom timeout for an async group. Overrides the timeout setting defined in configs
 *
 * @since 1.0
 */
export function group<T extends any>(
  definitionResolvable: T,
  testDefinitions: VoidLikeFunction,
  timeout?: number | undefined,
) {
  testCollector.addToGroupClousure(async () => {
    await executePromiseWithTimeout<void>(async (resolve) => {
      testCollector.isInsideGroupClausure = true;

      if (testDefinitions) {
        await testDefinitions();
        await testCollector.executeTestClojure();
        const resolvedName = await resolveName(definitionResolvable);
        // In case of expect() be added in test clausure
        // that is contained in testDefinitions()
        if (testCollector.tests && testCollector.tests.length > 0) {
          testCollector.groups.push({
            name: resolvedName,
            tests: testCollector.tests.map((test) => test),
          });
        }

        // Case expect() be added inside the group clausure
        if (testCollector.isInsideTestClausureFunctions()) {
          const testsCloned = testCollector.cloneTestFunctions();
          testCollector.groups.push({
            name: resolvedName,
            tests: [{ testsFunctions: testsCloned }],
          });
          testCollector.clearTestFunctions();
        }
      }

      testCollector.tests = [];
      testCollector.isInsideGroupClausure = false;
      resolve();
    }, timeout ?? runtime.timeOut);
  });
}
