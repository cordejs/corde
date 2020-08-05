import { List } from "../src/list";

let list: List<number>;
describe("testing list structure", () => {
  beforeEach(() => {
    list = new List<number>();
  });

  describe("testing add()", () => {
    it("should add a item", () => {
      list.add(1);
      expect(list.get(0)).toBe(1);
    });

    it("should not add a item due to it be undefined", () => {
      list.add(null);
      expect(list.any()).toBe(false);
    });
  });

  describe("testing any()", () => {
    it("should return that has no element", () => {
      expect(list.any()).toBe(false);
    });

    it("should return that has element", () => {
      list.add(1);
      expect(list.any()).toBe(true);
    });
  });

  describe("testing has()", () => {
    it("should return that element exists in list", () => {
      list.add(11);
      expect(list.has(11)).toBe(true);
    });

    it("should return that element do not exists in list", () => {
      list.add(11);
      expect(list.has(12)).toBe(false);
    });
  });

  describe("testing indexOf", () => {
    it("should find the index of the element", () => {
      list.add(111);
      expect(list.indexOf(111)).toBe(0);
    });
    it("should not find the index of the element", () => {
      list.add(111);
      expect(list.indexOf(321)).toBe(-1);
    });
  });
});
