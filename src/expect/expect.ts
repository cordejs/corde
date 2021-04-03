import { AllExpectMatches, ExpectMatches } from "./matcher";
import { Expect, MacherContructorArgs } from "./types";

const _expect: any = <T extends (() => number | string) | number | string>(
  commandNameResolvable: T,
) => {
  return new AllExpectMatches<void>(commandNameResolvable);
};

const defaultConstructor: MacherContructorArgs = { isCascade: true, isNot: false, commandName: "" };
const matcherBase = new ExpectMatches(defaultConstructor);
const prototype = Object.getPrototypeOf(matcherBase);

const notExpect = new ExpectMatches({ ...defaultConstructor, isNot: true });
_expect.not = notExpect;

Object.getOwnPropertyNames(prototype).map((propName) => {
  if (propName !== "constructor" && typeof prototype[propName] === "function") {
    _expect[propName] = (...args: any[]) => {
      return (new ExpectMatches(defaultConstructor) as any)[propName](...args);
    };
  }
});

const expect = _expect as Expect;

export { expect };
