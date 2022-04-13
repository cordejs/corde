import { object } from "../../src/utils/object";

const objs = {
  key1: {
    val: 1,
  },
  key2: {
    val: 2,
  },
  key3: {
    val: 3,
  },
  key4: {
    val: 4,
  },
};

describe("testing object namespace", () => {
  describe("testing object.find", () => {
    it("should find object", () => {
      expect(object.find(objs, (obj) => obj.val === 3)).toEqual({ val: 3 });
    });

    it("should not find object", () => {
      expect(object.find(objs, (obj) => obj.val === 67)).not.toEqual({ val: 3 });
    });
  });

  describe("testing object.foreach", () => {
    let indexPos = 0;
    let val = 1;
    object.foreach(objs, (obj, index, array) => {
      expect(array).toEqual(["key1", "key2", "key3", "key4"]);
      expect(index).toEqual(indexPos);
      expect(obj.val).toEqual(val);
      indexPos++;
      val++;
    });
  });

  describe("testing foreachKey", () => {
    let indexPos = 0;
    let val = 1;
    object.foreachKey(objs, (key, index, array) => {
      expect(array).toEqual(["key1", "key2", "key3", "key4"]);
      expect(index).toEqual(indexPos);
      expect(objs[key].val).toEqual(val);
      indexPos++;
      val++;
    });
  });
});
