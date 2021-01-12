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
  export const afterAll = _afterAll;
  export const beforeStart = _beforeStart;
  export const afterEach = _afterEach;
  export const beforeEach = _beforeEach;
  export const expect = _expect;
  export const group = _group;
  export const test = _test;
  export const sendMessage = _sendMessage;
}
