import { dateDiff } from "../../src/utils";

// DateFormat Date(year, month, day, hour, minute, second, milisecond)

describe("testing dateDiff function", () => {
  test("should output 1s", () => {
    const date1 = new Date(2020, 12, 1, 10, 10, 11);
    const date2 = new Date(2020, 12, 1, 10, 10, 10);
    const diff = dateDiff(date1, date2);
    expect(diff[0]).toEqual("1s");
    expect(diff[1]).toEqual(1000);
  });

  test("should output 1.01s", () => {
    const date1 = new Date(2020, 12, 1, 10, 10, 11, 10);
    const date2 = new Date(2020, 12, 1, 10, 10, 10);
    const diff = dateDiff(date1, date2);
    expect(diff[0]).toEqual("1.01s");
    expect(diff[1]).toEqual(1010);
  });

  test("should output 992ms", () => {
    const date1 = new Date(2020, 12, 1, 10, 10, 10, 992);
    const date2 = new Date(2020, 12, 1, 10, 10, 10);
    const diff = dateDiff(date1, date2);
    expect(diff[0]).toEqual("992ms");
    expect(diff[1]).toEqual(992);
  });

  test("should output 1.321s", () => {
    const date1 = new Date(2020, 12, 1, 10, 10, 11, 321);
    const date2 = new Date(2020, 12, 1, 10, 10, 10);
    const diff = dateDiff(date1, date2);
    expect(diff[0]).toEqual("1.321s");
    expect(diff[1]).toEqual(1321);
  });

  test("should output 10.321s", () => {
    const date1 = new Date(2020, 12, 1, 10, 10, 20, 321);
    const date2 = new Date(2020, 12, 1, 10, 10, 10);
    const diff = dateDiff(date1, date2);
    expect(diff[0]).toEqual("10.321s");
    expect(diff[1]).toEqual(10321);
  });

  test("should output null due to no date1", () => {
    const date2 = new Date(2020, 12, 1, 10, 10, 10);
    expect(dateDiff(null, date2)).toBeFalsy();
  });

  test("should output null due to no date2", () => {
    const date1 = new Date(2020, 12, 1, 10, 10, 10);
    expect(dateDiff(date1, null)).toBeFalsy();
  });

  test("should output null due to date1 is not a Date", () => {
    const date2 = new Date(2020, 12, 1, 10, 10, 10);
    // @ts-ignore
    expect(dateDiff(123, date2)).toBeFalsy();
  });

  test("should output null due to date2 is not a Date", () => {
    const date1 = new Date(2020, 12, 1, 10, 10, 10);
    // @ts-ignore
    expect(dateDiff(date1, 321)).toBeFalsy();
  });
});
