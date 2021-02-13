import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.afterAll(() => {
  console.log("test afterAll");
});

corde.test("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ hasPassed: true }));
});
