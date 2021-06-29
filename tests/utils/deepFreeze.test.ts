import { deepFreeze } from "../../src/utils";

describe("testing deepFreeze entity", () => {
  it("should freeze entity ignoring private properties using class", () => {
    class A {
      private _priv: string;
      public pub: string;
      constructor() {
        this._priv = "priv entity";
        this.pub = "pub entity";
      }

      fn() {
        return 1;
      }
    }

    const frozen = deepFreeze(new A());
    expect(Object.isFrozen(frozen)).toBeTruthy();
    expect(frozen).toEqual({ pub: "pub entity" });
  });

  it("should map sub objects", () => {
    const obj = {
      a: 1,
      b: {
        c: 1,
      },
    };

    const frozen = deepFreeze(obj);
    expect(Object.isFrozen(frozen)).toBeTruthy();
    expect(frozen).toEqual(obj);
  });

  it("should return frozen empty object for a number", () => {
    // @ts-ignore
    const frozen = deepFreeze(1);
    expect(Object.isFrozen(frozen)).toBeTruthy();
    expect(frozen).toEqual({});
  });

  it("should return frozen empty object for a string", () => {
    // @ts-ignore
    const frozen = deepFreeze("asa");
    expect(Object.isFrozen(frozen)).toBeTruthy();
    expect(frozen).toEqual({});
  });

  it("should return frozen empty object for a boolean", () => {
    // @ts-ignore
    const frozenFalse = deepFreeze(false);
    expect(Object.isFrozen(frozenFalse)).toBeTruthy();
    expect(frozenFalse).toEqual({});

    // @ts-ignore
    const frozenTrue = deepFreeze(true);
    expect(Object.isFrozen(frozenTrue)).toBeTruthy();
    expect(frozenTrue).toEqual({});
  });

  it("should return frozen empty object for a undefined", () => {
    const frozen = deepFreeze(undefined);
    expect(Object.isFrozen(frozen)).toBeTruthy();
    expect(frozen).toEqual({});
  });

  it("should return frozen empty object for a null", () => {
    const frozen = deepFreeze(null);
    expect(Object.isFrozen(frozen)).toBeTruthy();
    expect(frozen).toEqual({});
  });

  it("should return frozen object with array", () => {
    const frozen = deepFreeze({
      arr: [1, 2],
    });
    expect(Object.isFrozen(frozen)).toBeTruthy();
    expect(frozen).toEqual({
      arr: [1, 2],
    });

    try {
      // @ts-ignore
      // Property 'push' does not exist on type 'readonly number[]'
      frozen.arr.push(1);
      fail();
    } catch (error) {
      expect(error).toBeTruthy();
      expect(frozen.arr.length).toEqual(2);
    }
  });
});
