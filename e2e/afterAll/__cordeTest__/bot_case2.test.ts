import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";
import { wait } from "../../../lib/src/utils";

corde.afterAll(async () => {
  await wait(100);
  console.log("test afterAll");
});

corde.test("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true }));
});
