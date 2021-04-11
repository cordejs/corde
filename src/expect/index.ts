import { RoleMatchesImpl, MessageMatchesImpl, ToHaveResultMatcher } from "./matcher";
import { Expect, MacherContructorArgs } from "../types";

function getMessageMatchers(): string[] {
  return getFunctions(MessageMatchesImpl);
}

function getRoleMatchers(): string[] {
  return getFunctions(RoleMatchesImpl);
}

function getToHaveResultsMatchers(): string[] {
  return getFunctions(ToHaveResultMatcher);
}

function getFunctions<T>(type: new (...args: any[]) => T): string[] {
  return Object.getOwnPropertyNames(type.prototype).filter(
    (propName) => propName !== "constructor" && typeof type.prototype[propName] === "function",
  );
}

const expectation = {
  not: {},
  inGuild: {},
};

function createTestFunction(classType: any, params: MacherContructorArgs, functionName: string) {
  return (...args: any[]) => (new classType(params) as any)[functionName](...args);
}

function createTestsFromMatches<T>(
  names: string[],
  params: MacherContructorArgs,
  classType: new (...args: any[]) => T,
): [string, (...args: any[]) => any][] {
  return names.map((name) => {
    return [name, createTestFunction(classType, params, name)];
  });
}

function set(from: [string, (...args: any[]) => any][], to: any) {
  from.forEach((test) => {
    to[test[0]] = test[1];
  });
}

const messageTestNames = getMessageMatchers();
const roleMatchers = getRoleMatchers();
const resultMatchers = getToHaveResultsMatchers();

const _expect: any = <T extends (() => number | string) | number | string>(
  commandName: T,
  channelId?: string,
) => {
  const baseMatcherConstructor: MacherContructorArgs = {
    commandName,
    channelIdToSendCommand: channelId,
  };

  const messageTests = createTestsFromMatches(
    messageTestNames,
    baseMatcherConstructor,
    MessageMatchesImpl,
  );

  const todoInCascadeMatcher = createTestsFromMatches(
    resultMatchers,
    baseMatcherConstructor,
    ToHaveResultMatcher,
  );

  const todoInCascadeMatcherIsNot = createTestsFromMatches(
    resultMatchers,
    { ...baseMatcherConstructor, isNot: true },
    ToHaveResultMatcher,
  );

  set(todoInCascadeMatcher, expectation);
  set(todoInCascadeMatcherIsNot, expectation.not);

  const isNotMessageTests = createTestsFromMatches(
    messageTestNames,
    { ...baseMatcherConstructor, isNot: true },
    MessageMatchesImpl,
  );

  const roleTests = createTestsFromMatches(roleMatchers, baseMatcherConstructor, RoleMatchesImpl);

  const isNotRoleTests = createTestsFromMatches(
    roleMatchers,
    { commandName, isNot: true },
    RoleMatchesImpl,
  );

  set(messageTests, expectation);
  set(isNotMessageTests, expectation.not);

  set(roleTests, expectation);
  set(isNotRoleTests, expectation.not);

  expectation.inGuild = (guildId: string) => {
    const guildMatchers: any = {
      not: {},
    };

    const roleTests = createTestsFromMatches(
      messageTestNames,
      { ...baseMatcherConstructor, guildId },
      RoleMatchesImpl,
    );

    const isNotRoleTests = createTestsFromMatches(
      messageTestNames,
      { ...baseMatcherConstructor, guildId, isNot: true },
      RoleMatchesImpl,
    );

    set(roleTests, guildMatchers);
    set(isNotRoleTests, guildMatchers.not);

    return guildMatchers;
  };

  return expectation;
};

const messageTests = createTestsFromMatches(
  messageTestNames,
  { commandName: "", isNot: false, isCascade: true },
  MessageMatchesImpl,
);

const isNotMessageTests = createTestsFromMatches(
  messageTestNames,
  { commandName: "", isNot: true, isCascade: true },
  MessageMatchesImpl,
);

const roleTests = createTestsFromMatches(
  roleMatchers,
  { commandName: "", isNot: false, isCascade: true },
  RoleMatchesImpl,
);

const isNotRoleTests = createTestsFromMatches(
  roleMatchers,
  { commandName: "", isNot: true, isCascade: true },
  RoleMatchesImpl,
);

_expect.not = {};

set(messageTests, _expect);
set(isNotMessageTests, _expect.not);

set(roleTests, _expect);
set(isNotRoleTests, _expect.not);

const expect = _expect as Expect;

export { expect };
