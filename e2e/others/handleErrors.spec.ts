/// <reference types="../../src/global" />

beforeAll(() => throwErr());
// afterAll(() => throwErr());
// beforeEach(() => throwErr());
// afterEach(() => throwErr());

it("should fail in delete a role", async () => {
  throwErr();
  expect(1).toEqual(1);
});

it("should fail in delete a role", async () => {
  expect(1).toBeGreaterThan(10);
});

function throwErr() {
  throw new Error("bug");
}
