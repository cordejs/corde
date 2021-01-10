import { corde } from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

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

corde.test("", () => {
  // @ts-expect-error
  testCollector.addTestFunction(() => Promise.resolve({ hasPassed: true }));
});
