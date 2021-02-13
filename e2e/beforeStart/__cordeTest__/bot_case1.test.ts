import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.beforeStart(() => {
  console.log("test beforeStart");
});

corde.test("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ hasPassed: true }));
});
