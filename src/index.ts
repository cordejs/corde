export { group, test, group as describe, test as it } from "./closures";
export { expect } from "./command";
export { afterAll, beforeStart, afterEach, beforeEach } from "./hooks";
export * from "./types/general";

import { corde } from "./corde";
export const bot = corde.bot;

export default corde;
