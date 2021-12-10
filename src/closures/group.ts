import { Group } from "../core/Group";
import runtime from "../core";
import { VoidLikeFunction } from "../types";
import { resolveName } from "../utils";

export const group: corde.IDescribeClousure = <T extends any>(
  description: T,
  testDefinitions: VoidLikeFunction,
) => {
  const { testCollector } = runtime;
  const _internalGroup = async () => {
    testCollector.currentTestFile.isInsideGroupClausure = true;

    if (testDefinitions) {
      const resolvedName = await resolveName(description);
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
};

/**
 * Alias for `describe`
 */
export const describe = group;
