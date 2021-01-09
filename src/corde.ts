export * as api from "./api";
import {
  afterAll as _afterAll,
  beforeStart as _beforeStart,
  afterEach as _afterEach,
  beforeEach as _beforeEach,
  expect as _expect,
  group as _group,
  test as _test,
} from "./api";

export namespace corde {
  export var afterAll = _afterAll;
  export var beforeStart = _beforeStart;
  export var afterEach = _afterEach;
  export var beforeEach = _beforeEach;
  export var expect = _expect;
  export var group = _group;
  export var test = _test;
}
