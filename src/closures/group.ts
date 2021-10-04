import { Group } from "../core/Group";
import { testCollector } from "../core/testCollector";
import { VoidLikeFunction } from "../types";
import { resolveName } from "../utils";

/**
 * Create a group of tests.
 *
 * @param descriptionDefinition Resolvable description of the group. It is often a string,
 * but can be sync or async functions, numbers, booleans... Functions will be executed to get the
 * primitive value of then.
 *
 * @param testDefinitions Function for Corde to invoke that will define inner suites a test
 *
 * @since 1.0
 */
export function group<T extends any>(definitionResolvable: T, testDefinitions: VoidLikeFunction) {
  const _internalGroup = async () => {
    testCollector.currentTestFile.isInsideGroupClausure = true;

    if (testDefinitions) {
      const resolvedName = await resolveName(definitionResolvable);
      const groupEntity = new Group({ name: resolvedName });
      testCollector.currentTestFile.currentGroup = groupEntity;
      testCollector.currentTestFile.closures.push(groupEntity);
      await testDefinitions();
      testCollector.currentTestFile.currentGroup = undefined;
    }

    testCollector.currentTestFile.isInsideGroupClausure = false;
  };

  if (testCollector.currentTestFile.isInsideTestClausure) {
    throw new Error("Cannot nest a group inside a test");
  }

  testCollector.addToGroupClousure(() => _internalGroup());
}

/**
 * Alias for `describe`
 */
export const describe = group;
