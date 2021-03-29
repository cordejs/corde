import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";
import { wait } from "../../../src/utils";

corde.beforeEach(async () => {
  await wait(100);
  console.log("test beforeEach");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true }));
});
