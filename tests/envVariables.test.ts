import { initEnvVariables } from "../src/envVariables";

describe("check initialization of env variable", () => {
  it("should set NODE_ENV to 'test'", () => {
    delete process.env.NODE_ENV;
    initEnvVariables();
    expect(process.env.NODE_ENV).toEqual("test");
  });
});
