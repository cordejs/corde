import { any } from "../../src/expect/asymmetricMatcher";

class Class {}

describe("testing any matcher", () => {
  it.each([[Number], [BigInt], [Boolean], [Function], [Object], [Symbol], [Class]])(
    "should return true for any type %s",
    (classType) => {
      expect(any().matchType(classType)).toBeTruthy();
    },
  );

  it.each([[Number], [BigInt], [Boolean], [Function], [Object], [Symbol], [Class]])(
    "should assert type %s",
    (classType) => {
      expect(any(classType).matchType(classType)).toBeTruthy();
    },
  );

  it("should assert with multiples type", () => {
    expect(any(Number, String).matchType(Number)).toBeTruthy();
  });

  it("should return name of asymetric", () => {
    expect(any().toString()).toEqual("any");
  });

  it("should return name of asymetric", () => {
    expect(
      any(Number, BigInt, Boolean, Function, Object, Symbol, Class).toString(),
    ).toMatchSnapshot();
  });

  it("should return false for asymetric declared with no type", () => {
    expect(any().isSpecified()).toBeFalsy();
  });

  it("should return true for asymetric declared with no type", () => {
    expect(any(Number).isSpecified()).toBeTruthy();
  });

  it.each([
    [undefined, undefined],
    [null, null],
  ])("should assert true for type %s, with value %s", (classType, value) => {
    expect(any(classType).matchValue(value)).toBeTruthy();
  });

  it.each([
    [Number, 1],
    [Number, new Number()],
    [String, new String()],
    [Boolean, new Boolean()],
    [Function, new Function()],
    [BigInt, 9007199254740991n],
    [Boolean, false],
    [Function, () => {}],
    [Object, {}],
    [Array, []],
    [Symbol, Symbol.for("")],
    [Class, new Class()],
  ])("should assert type %s, with value %s", (classType, value) => {
    expect(any(classType).matchValue(value)).toBeTruthy();
  });
});
