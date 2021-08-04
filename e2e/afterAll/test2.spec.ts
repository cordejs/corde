/* eslint-disable no-console */
import corde from "../../lib";
import { wait } from "../../lib/src/utils";
import { testCollector } from "../../lib/src/common/testCollector";

corde.afterAll(async () => {
  await wait(100);
  console.log("test");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
