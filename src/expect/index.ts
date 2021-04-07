import { RoleMatches, MessageMatches } from "./matcher";
import { Expect, MacherContructorArgs } from "./types";

function getMessageMatchers(): string[] {
  return getFunctions(MessageMatches);
}

function getRoleMatchers(): string[] {
  return getFunctions(RoleMatches);
}

function getFunctions<T>(type: new (...args: any[]) => T): string[] {
  return Object.getOwnPropertyNames(type.prototype).filter(
    (propName) => propName !== "constructor" && typeof type.prototype[propName] === "function",
  );
}

const expectation = {
  not: {},
  inChannel: {},
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

const _expect: any = <T extends (() => number | string) | number | string>(commandName: T) => {
  const messageTests = createTestsFromMatches(
    messageTestNames,
    { commandName, isNot: false },
    MessageMatches,
  );

  const isNotMessageTests = createTestsFromMatches(
    messageTestNames,
    { commandName, isNot: true },
    MessageMatches,
  );

  const roleTests = createTestsFromMatches(
    roleMatchers,
    { commandName, isNot: false },
    RoleMatches,
  );

  const isNotRoleTests = createTestsFromMatches(
    roleMatchers,
    { commandName, isNot: true },
    RoleMatches,
  );

  set(messageTests, expectation);
  set(isNotMessageTests, expectation.not);

  set(roleTests, expectation);
  set(isNotRoleTests, expectation.not);

  expectation.inChannel = (channelId: string) => {
    const channelMatchers: any = {
      not: {},
    };

    const messageTests = createTestsFromMatches(
      messageTestNames,
      { commandName, channelId },
      MessageMatches,
    );

    const isNotmessageTests = createTestsFromMatches(
      messageTestNames,
      { commandName, channelId, isNot: true },
      MessageMatches,
    );

    set(messageTests, channelMatchers);
    set(isNotmessageTests, channelMatchers.not);

    return channelMatchers;
  };

  expectation.inGuild = (guildId: string) => {
    const guildMatchers: any = {
      not: {},
    };

    const roleTests = createTestsFromMatches(
      messageTestNames,
      { commandName, guildId },
      RoleMatches,
    );

    const isNotRoleTests = createTestsFromMatches(
      messageTestNames,
      { commandName, guildId },
      RoleMatches,
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
  RoleMatches,
);

const isNotRoleTests = createTestsFromMatches(
  roleMatchers,
  { commandName: "", isNot: true, isCascade: true },
  RoleMatches,
);

_expect.not = {};

set(messageTests, _expect);
set(isNotMessageTests, _expect.not);

set(roleTests, _expect);
set(isNotRoleTests, _expect.not);

const expect = _expect as Expect;

export { expect };
