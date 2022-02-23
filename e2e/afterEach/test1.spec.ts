/// <reference types="../../lib/src/global" />

/* eslint-disable no-console */
import { testCollector } from "../../lib/src/core/testCollector";

afterAll(() => {
  console.log("test afterAll");
});

it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true } as any));
});
