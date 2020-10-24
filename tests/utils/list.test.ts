import { List } from "../../src/utils/list";

interface ObjectTest {
  id: number;
  name: string;
}

describe("testing list structure", () => {
  let list: List<number>;
  let objectList: List<ObjectTest>;
  const testObject = { id: 1, name: "lucas" };
  beforeEach(() => {
    list = new List<number>();
    objectList = new List<ObjectTest>();
  });

  it("should create a list with data", () => {
    list = new List<number>(1, 2);
    expect(list[0]).toBe(1);
    expect(list[1]).toBe(2);
  });

  it("should convert an array to list", () => {
    const newList = list.toList([1]);
    expect(newList[0]).toBe(1);
  });

  it("should convert null value to list", () => {
    const newList = list.toList(null);
    expect(newList[0]).toBeFalsy();
  });

  it("should get single element", () => {
    const newList = new List<ObjectTest>(testObject);
    expect(newList.single((obj) => obj.id === 1)).toEqual(testObject);
  });

  it("should get first element", () => {
    list.push(1);
    expect(list.first()).toBe(1);
  });

  it("should get null as first element", () => {
    expect(list.first()).toBeFalsy();
  });

  it("should get last element", () => {
    list.push(1, 2, 3, 4);
    expect(list.last()).toBe(4);
  });

  it("should get null as last element", () => {
    expect(list.last()).toBeFalsy();
  });

  it("should clear the list", () => {
    list.push(1, 2, 3);
    list.clear();
    expect(list.length).toBe(0);
  });

  it("should return 0 due to empty list", () => {
    expect(list.length).toBe(0);
  });

  it("should clone a list", () => {
    objectList.push(testObject);
    const clone = objectList.clone();
    expect(clone).not.toBe(objectList);
  });

  it("should clone an empty array to a empty array", () => {
    expect(objectList.clone().length).toEqual(objectList.length);
  });

  it("should pick property from an list", () => {
    objectList.push(testObject);
    const pickedIds = objectList.pick("id");
    expect(pickedIds[0].id).toBe(testObject.id);
  });

  it("should check if list has any object", () => {
    list.push(1);
    expect(list.any()).toBeTruthy();
  });

  it("should return false due to no data on list", () => {
    expect(list.any()).toBeFalsy();
  });

  it("should remove data from list using directly value", () => {
    list.push(1);
    list.remove(1);
    expect(list.length).toBe(0);
  });

  it("should remove more than one element", () => {
    list.push(1, 2);
    list.remove([1, 2]);
    expect(list.length).toBe(0);
  });

  it("should not remove itens of the list due to it's empty", () => {
    list.remove(null);
    expect(list.length).toBe(0);
  });

  it("should get an element", () => {
    list.push(1);
    const item = list.get(0);
    expect(item).toBe(1);
  });

  it("should not get an element", () => {
    const item = list.get(null);
    expect(item).toBeFalsy();
  });

  it("should get a list of elements", () => {
    list.push(1, 2);
    const itens = list.get([0, 1]);
    expect(itens).toEqual(new List(1, 2));
  });

  it("should return true to existing element", () => {
    list.push(1);
    expect(list.has(1)).toBeTruthy();
  });

  it("should map equal Array.map", () => {
    list.push(1);
    const newItem = list.map((n) => n);
    expect(newItem.any()).toBeTruthy();
  });

  it("should take 1", () => {
    list.push(1);
    expect(list.take(0, 1)).toEqual(new List(1));
  });

  it("should create a list from array", () => {
    expect(List.fromArray([1, 2, 3])).toEqual(new List(1, 2, 3));
  });

  it("should create a empty list from array", () => {
    expect(List.fromArray()).toEqual(new List());
  });

  it("should use Array.foreach", () => {
    expect(list.forEach((v) => v)).toBe(list);
  });
});
