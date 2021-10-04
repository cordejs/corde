/* eslint-disable no-console */
import corde from "../../lib";
import { testCollector } from "../../lib/src/core/testCollector";

beforeAll(() => {
  console.log("test beforeStart");
});

it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
