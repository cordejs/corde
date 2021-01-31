import {
  afterAll as _afterAll,
  beforeStart as _beforeStart,
  afterEach as _afterEach,
  beforeEach as _beforeEach,
  expect as _expect,
  group as _group,
  test as _test,
  sendMessage as _sendMessage,
} from "./api";

export namespace corde {
  export let afterAll = _afterAll;
  export let beforeStart = _beforeStart;
  export let afterEach = _afterEach;
  export let beforeEach = _beforeEach;
  export let expect = _expect;
  export let group = _group;
  export let test = _test;
  export let sendMessage = _sendMessage;
}
