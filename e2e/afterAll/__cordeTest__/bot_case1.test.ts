import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.afterAll(() => {
  console.log("test afterAll");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true }));
});
