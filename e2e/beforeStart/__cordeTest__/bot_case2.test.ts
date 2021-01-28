import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

async function asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 50);
  });
}

corde.beforeStart(async () => {
  await asyncFunction();
  console.log("test beforeStart");
});

corde.test("", () => {
  // @ts-expect-error
  testCollector.addTestFunction(() => Promise.resolve({ hasPassed: true }));
});
