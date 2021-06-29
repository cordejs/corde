import {
  afterAll as _afterAll,
  beforeStart as _beforeStart,
  afterEach as _afterEach,
  beforeEach as _beforeEach,
} from "./hooks";

import { expect as _expect } from "./expect";
import { group as _group, test as _test } from "./closures";
import { Bot } from "./api";
import { runtime } from "./common/runtime";

/**
 * Corde's utility namespace to call it's API functions.
 * You can also import each function desconstructing in corde lib import
 */
export namespace corde {
  export const afterAll = _afterAll;
  export const beforeStart = _beforeStart;
  export const afterEach = _afterEach;
  export const beforeEach = _beforeEach;
  export const expect = _expect;
  export const group = _group;
  export const describe = _group;
  export const it = _test;
  export const test = _test;
  export const bot = new Bot(runtime.bot);
}
