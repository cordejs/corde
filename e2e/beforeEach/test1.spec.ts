/* eslint-disable no-console */
import corde from "../../lib";
import { testCollector } from "../../lib/src/core/testCollector";

corde.beforeEach(() => {
  console.log("test beforeEach");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
