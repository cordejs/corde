import { Group } from "../common/Group";
import { testCollector } from "../common/testCollector";
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
export const group = <T extends any>(
  definitionResolvable: T,
  testDefinitions: VoidLikeFunction,
) => {
  const _internalGroup = async () => {
    if (testCollector.isInsideTestClausure) {
      throw new Error("Cannot nest a group inside a test");
    }
    testCollector.currentTestFile.isInsideGroupClausure = true;

    if (testDefinitions) {
      const resolvedName = await resolveName(definitionResolvable);
      testCollector.currentTestFile.groups.push(new Group({ name: resolvedName }));
      await testDefinitions();
    }

    testCollector.currentTestFile.isInsideGroupClausure = false;
  };

  testCollector.addToGroupClousure(() => _internalGroup());
};

/**
 * Alias for `describe`
 */
export const describe = group;
