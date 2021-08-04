/* eslint-disable no-console */
import corde from "../../lib";
import { testCollector } from "../../lib/src/common/testCollector";

async function asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 50);
  });
}

corde.afterAll(async () => {
  await asyncFunction();
  console.log("test afterAll");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
