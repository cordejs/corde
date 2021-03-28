import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.beforeEach(async () => {});

corde.test("should send a message", async () => {
  const msg = await corde.sendMessage("TEST MESSAGE");
  console.log(msg.content);
  testCollector.addTestFunction(() => Promise.resolve({ pass: true }));
});
