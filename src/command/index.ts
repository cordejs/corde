import { RoleMatchesImpl, MessageMatches, ToHaveResultMatcher } from "./matcher";
import { IExpect, IMacherContructorArgs } from "../types";

function getMessageMatchers(): string[] {
  return getFunctions(MessageMatches);
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
  inChannel: {},
};

function createTestFunction(classType: any, params: IMacherContructorArgs, functionName: string) {
  return (...args: any[]) => (new classType(params) as any)[functionName](...args);
}

function createTestsFromMatches<T>(
  names: string[],
  params: IMacherContructorArgs,
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
  const baseMatcherConstructor: IMacherContructorArgs = {
    commandName,
    channelIdToSendCommand: channelId,
  };

  const messageTests = createTestsFromMatches(
    messageTestNames,
    baseMatcherConstructor,
    MessageMatches,
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
    MessageMatches,
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
    const inGuildMatches: any = {
      not: {},
    };

    const roleTests = createTestsFromMatches(
      roleMatchers,
      { ...baseMatcherConstructor, guildId },
      RoleMatchesImpl,
    );

    const isNotRoleTests = createTestsFromMatches(
      roleMatchers,
      { ...baseMatcherConstructor, guildId, isNot: true },
      RoleMatchesImpl,
    );

    set(roleTests, inGuildMatches);
    set(isNotRoleTests, inGuildMatches.not);

    return inGuildMatches;
  };

  expectation.inChannel = (channelId: string) => {
    const inChannelMatches: any = {
      not: {},
    };

    const roleTests = createTestsFromMatches(
      messageTestNames,
      { ...baseMatcherConstructor, channelId },
      MessageMatches,
    );

    const isNotRoleTests = createTestsFromMatches(
      messageTestNames,
      { ...baseMatcherConstructor, channelId, isNot: true },
      MessageMatches,
    );

    set(roleTests, inChannelMatches);
    set(isNotRoleTests, inChannelMatches.not);

    return inChannelMatches;
  };

  return expectation;
};

const messageTests = createTestsFromMatches(
  messageTestNames,
  { commandName: "", isNot: false, isCascade: true },
  MessageMatches,
);

const isNotMessageTests = createTestsFromMatches(
  messageTestNames,
  { commandName: "", isNot: true, isCascade: true },
  MessageMatches,
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

const expect = _expect as IExpect;

export { expect };
