import {
  afterAll as _afterAll,
  beforeStart as _beforeStart,
  afterEach as _afterEach,
  beforeEach as _beforeEach,
} from "./hooks";

import { expect as _expect } from "./expect";
import { group as _group, test as _test } from "./closures";
import { Bot, ConfigsAPI } from "./api";
import { runtime } from "./common/runtime";
import { IConfigOptions } from "./types";

function getConfigs(): Readonly<IConfigOptions> {
  return new ConfigsAPI(runtime.configs);
}

function getBot() {
  return new Bot(runtime.bot);
}

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
  /**
   * Corde's bot API
   */
  export const bot = getBot();
  /**
   * Corde's configs for readonly purpose
   */
  export const configs = getConfigs();
}
