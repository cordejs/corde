/* eslint-disable no-console */
import corde from "../../lib";
import { testCollector } from "../../lib/src/core/testCollector";

async function asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 50);
  });
}

corde.beforeAll(async () => {
  await asyncFunction();
  console.log("test beforeStart");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
