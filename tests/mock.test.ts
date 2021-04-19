import { createMock } from "../src/mock";

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

    createMock(obj, "prop1").mockReturnValue(2, 2);
    expect(obj.prop1).toEqual(2);
    expect(obj.prop1).toEqual(2);
    expect(obj.prop1).toEqual(1);
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
});
