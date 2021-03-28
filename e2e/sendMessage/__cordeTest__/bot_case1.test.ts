import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.beforeEach(async () => {});

corde.test("", async () => {
  const msg = await corde.sendMessage("TEST MESSAGE");
  console.log(msg.content);
  testCollector.addTestFunction(() => Promise.resolve({ pass: true }));
});
