import { createMock } from "../src/mock";
import * as fn from "./mocks/mockFunctionTest";

describe("testing corde mock", () => {
  it("should mock value in object", () => {
    const obj = {
      prop1: 1,
    };

    createMock(obj, "prop1").mockReturnValue(2);
    expect(obj.prop1).toEqual(2);
  });

  it("should mock value in multiple times", () => {
    const obj = {
      prop1: 1,
    };

    const mock = createMock(obj, "prop1").mockReturnValue(2, 2);
    expect(obj.prop1).toEqual(2);
    expect(obj.prop1).toEqual(2);
    expect(obj.prop1).toEqual(1);
    expect(mock.callsCount).toEqual(3);
  });

  it("should mock return value and reset count", () => {
    const obj = {
      prop1: 1,
    };

    const mock = createMock(obj, "prop1").mockReturnValue(2, 2);
    expect(obj.prop1).toEqual(2);
    mock.restoreCalls();
    expect(obj.prop1).toEqual(2);
    expect(obj.prop1).toEqual(2);
    expect(mock.callsCount).toEqual(3);
  });

  it("should mock value in object and restore it", () => {
    const obj = {
      prop1: 1,
    };

    const mock = createMock(obj, "prop1").mockReturnValue(2);
    mock.restore();
    expect(obj.prop1).toEqual(1);
  });

  it("should mock a function in object", () => {
    const obj = {
      func: () => {
        return 1;
      },
    };

    jest.fn().mockImplementation;
    createMock(obj, "func").mockImplementation();

    createMock(obj, "func").mockReturnValue(2);
    expect(obj.func()).toEqual(2);
  });

  it("should restore value of mock function", () => {
    const obj = {
      func: () => {
        return 1;
      },
    };

    const mock = createMock(obj, "func").mockReturnValue(2);
    mock.restore();
    expect(obj.func()).toEqual(1);
  });

  it("should mock once a value", () => {
    const obj = {
      prop1: 1,
    };

    createMock(obj, "prop1").mockReturnValueOnce(2);

    const propFirstValue = obj.prop1;
    const propSecondValue = obj.prop1;
    expect(propFirstValue).toEqual(2);
    expect(propSecondValue).toEqual(1);
  });

  it("should mock once a function", () => {
    const obj = {
      func: () => 1,
    };

    createMock(obj, "func").mockReturnValueOnce(2);

    const propFirstValue = obj.func();
    const propSecondValue = obj.func();

    expect(propFirstValue).toEqual(2);
    expect(propSecondValue).toEqual(1);
  });

  it("should mock implementation", () => {
    const obj = {
      sumOne: (value: number) => {
        return value + 1;
      },
    };

    expect(obj.sumOne(1)).toEqual(2);

    createMock(obj, "sumOne").mockImplementation((value) => {
      return value + 2;
    });

    expect(obj.sumOne(1)).toEqual(3);
  });

  it("should restore mocked implementation", () => {
    const obj = {
      sumOne: (value: number) => {
        return value + 1;
      },
    };

    expect(obj.sumOne(1)).toEqual(2);

    const mock = createMock(obj, "sumOne").mockImplementation((value) => {
      return value + 2;
    });

    expect(obj.sumOne(1)).toEqual(3);
    mock.restore();
    expect(obj.sumOne(1)).toEqual(2);
  });

  it("should mocked implementation more than one time", () => {
    const obj = {
      sumOne: (value: number) => {
        return value + 1;
      },
    };

    expect(obj.sumOne(1)).toEqual(2);

    createMock(obj, "sumOne").mockImplementation((value) => {
      return value + 2;
    });

    expect(obj.sumOne(1)).toEqual(3);
    expect(obj.sumOne(1)).toEqual(3);
  });

  it("should mock implementation once", () => {
    const obj = {
      sumOne: (value: number) => {
        return value + 1;
      },
    };

    expect(obj.sumOne(1)).toEqual(2);

    createMock(obj, "sumOne").mockImplementationOnce((value) => {
      return value + 2;
    });

    expect(obj.sumOne(1)).toEqual(3);
    expect(obj.sumOne(1)).toEqual(2);
  });

  it("should mock a external function", () => {
    createMock(fn, "sum").mockImplementation(() => {
      return 2;
    });

    expect(fn.sum(10, 10)).toEqual(2);
  });

  it("should mock promise.resolve return value (after resolved)", async () => {
    const obj = {
      sumOneAsync: (value: number) => {
        return Promise.resolve(value + 1);
      },
    };

    createMock(obj, "sumOneAsync").mockResolvedValue(1);
    const val = await obj.sumOneAsync(1);
    expect(val).toEqual(1);
  });

  it("should mock promise.resolve return a promise", async () => {
    const obj = {
      sumOneAsync: (value: number) => {
        return Promise.resolve(value + 1);
      },
    };

    createMock(obj, "sumOneAsync").mockResolvedValue(1);
    const promise = obj.sumOneAsync(1);
    expect(promise).toBeInstanceOf(Promise);
  });

  it("should mock promise.resolve return value (after resolved) once", async () => {
    const obj = {
      sumOneAsync: (value: number) => {
        return Promise.resolve(value + 1);
      },
    };

    createMock(obj, "sumOneAsync").mockResolvedValueOnce(1);
    const val = await obj.sumOneAsync(1);
    const val2 = await obj.sumOneAsync(1);
    expect(val).toEqual(1);
    expect(val2).toEqual(2);
  });
});
