import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.beforeEach(() => {
  console.log("test beforeEach");
});

corde.test("", () => {
  // @ts-expect-error
  testCollector.addTestFunction(() => Promise.resolve({ hasPassed: true }));
});
