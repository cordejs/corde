import { Group } from "../core/Group";
import runtime from "../core/runtime";
import { VoidLikeFunction } from "../types";
import { resolveName } from "../utils/resolveName";

export const group: corde.IDescribeClosure = <T>(
  description: T,
  testDefinitions: VoidLikeFunction,
) => {
  const { testCollector } = runtime;

  if (testCollector.currentTestFile.isInsideTestClosure) {
    throw new Error("Cannot nest a group inside a test");
  }

  const _internalGroup = async () => {
    testCollector.currentTestFile.isInsideGroupClosure = true;

    if (testDefinitions) {
      const resolvedName = await resolveName(description);
      const groupEntity = new Group({ name: resolvedName });
      testCollector.currentTestFile.currentGroup = groupEntity;
      testCollector.currentTestFile.closures.push(groupEntity);
      await testDefinitions();
      testCollector.currentTestFile.currentGroup = undefined;
    }

    testCollector.currentTestFile.isInsideGroupClosure = false;
  };

  testCollector.addToGroupClosure(() => _internalGroup());
};

/**
 * Alias for `describe`
 */
export const describe = group;
