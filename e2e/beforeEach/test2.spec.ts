/* eslint-disable no-console */
import corde from "../../lib";
import { testCollector } from "../../lib/src/core/testCollector";
import { wait } from "../../src/utils";

corde.beforeEach(async () => {
  await wait(100);
  console.log("test beforeEach");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
