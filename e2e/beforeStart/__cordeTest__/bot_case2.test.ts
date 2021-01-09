import { beforeStart } from "../../../lib";

async function asyncFunction() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 400);
  });
}

beforeStart(async () => {
  await asyncFunction();
  console.log("test beforeStart");
});
