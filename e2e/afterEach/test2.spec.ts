/// <reference types="../../src/global" />

async function _asyncFunction() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 50);
  });
}

afterAll(async () => {
  await _asyncFunction();
});

it("", () => {});
