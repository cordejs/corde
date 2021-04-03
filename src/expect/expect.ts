import { AllExpectMatches, ExpectMatches } from "./matcher";
import { Expect } from "./types";

const _expect: any = <T extends (() => number | string) | number | string>(
  commandNameResolvable: T,
) => {
  return new AllExpectMatches<void>(commandNameResolvable);
};

const matcherBase = new ExpectMatches({ isCascade: true, isNot: false, commandName: "" });
const prototype = Object.getPrototypeOf(matcherBase);

const notExpect = new ExpectMatches({ isCascade: true, isNot: true, commandName: "" });
_expect.not = notExpect;

Object.getOwnPropertyNames(prototype).map((propName) => {
  if (propName !== "constructor" && typeof prototype[propName] === "function") {
    _expect[propName] = (...args: any[]) => {
      return (new ExpectMatches({
        isCascade: true,
        isNot: false,
        commandName: "",
      }) as any)[propName](...args);
    };
  }
});

const expect = _expect as Expect;

export { expect };
