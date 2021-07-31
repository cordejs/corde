/* eslint-disable no-console */
import corde from "../../lib";
import { wait } from "../../lib/src/utils";

corde.afterAll(async () => {
  await wait(100);
  console.log("test");
});
