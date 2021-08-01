/* eslint-disable no-console */
import corde from "../../lib";
import { testCollector } from "../../lib/src/common/testCollector";

corde.beforeStart(() => {
  console.log("test beforeStart");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
