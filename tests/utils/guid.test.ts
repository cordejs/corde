import * as uuid from "uuid";
import { Guid } from "../../src/utils/guid";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
    validate: jest.fn(() => true),
    parse: jest.fn(),
  };
});

describe("testing guid manager", () => {
  it("should call guid generator", () => {
    const spy = jest.spyOn(uuid, "v4");
    Guid.new();
    expect(spy).toBeCalled();
  });

  it("should validate the guid", () => {
    Guid.validate(Guid.new());
    const spy = jest.spyOn(uuid, "validate");
    expect(spy).toBeCalled();
  });

  it("should parse the guid", () => {
    const spy = jest.spyOn(uuid, "parse");
    Guid.parse(Guid.new());
    expect(spy).toBeCalled();
  });
});
