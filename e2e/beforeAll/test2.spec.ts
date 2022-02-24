/// <reference types="../../lib/src/global" />

import testUtils from "../testUtils";

async function asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 50);
  });
}

beforeAll(async () => {
  await asyncFunction();
});

it("", () => {
  testUtils.addMockClosure();
});
