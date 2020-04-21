import { Group, AssertionProps, Test } from '../building/models';
import cordeBot from '../cordeBot';

export async function executeTestCases(groups: Group[]) {
  const assertions = getAssertionsFromGroups(groups);
  for (const i in assertions) {
    const assert = assertions[i];
    assert.output = await trySendMessage(assert);
  }
}

async function trySendMessage(assertion: AssertionProps) {
  try {
    return await cordeBot.sendMessage(assertion.commandName);
  } catch (error) {
    throw new Error('Timeout');
  }
}

function getAssertionsFromGroups(groups: Group[]) {
  const assertions: AssertionProps[] = [];

  if (!groups) {
    return assertions;
  }

  groups.forEach((group) => {
    assertions.push(...getAssertionPropsFromGroup(group));
  });

  return assertions;
}

function getAssertionPropsFromGroup(group: Group) {
  const assertions: AssertionProps[] = [];
  group.tests.forEach((test) => {
    assertions.push(...getAssertionsPropsFromTest(test));
  });

  if (group.subGroups) {
    group.subGroups.forEach((subGroup) => {
      const subGroupTests = getAssertionPropsFromGroup(subGroup);
      assertions.push(...subGroupTests);
    });
  }

  return assertions;
}

function getAssertionsPropsFromTest(test: Test) {
  const assertions = test.assertions;
  if (!test) {
    return assertions;
  }

  if (test.subTests) {
    test.subTests.forEach((subtest) => {
      assertions.push(...getAssertionsPropsFromTest(subtest));
    });
  }

  return assertions;
}
