/// <reference types="../../lib/src/global" />
/* eslint-disable no-console */

corde.afterAll(async () => {
  await wait(100);
  console.log("test");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
