import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.beforeEach(() => {
  console.log("test beforeEach");
});

corde.test("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true }));
});
