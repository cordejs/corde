/// <reference types="../../src/global" />

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

it("", () => {});
