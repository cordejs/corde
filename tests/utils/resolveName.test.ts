import { resolveName } from "../../src/utils/resolveName";

describe("testing resolveName", () => {
  it("should return a number if gives a number", async () => {
    const resolved = await resolveName(1);
    expect(resolved).toEqual(1);
  });

  it("should return a stringified symbol if gives a symbol", async () => {
    const symbol = Symbol("1");
    const resolved = await resolveName(symbol);
    expect(resolved).toEqual(symbol.toString());
  });

  it("should return a string if gives a string", async () => {
    const resolved = await resolveName("test name");
    expect(resolved).toEqual("test name");
  });

  it("should return a boolean if gives a boolean (false)", async () => {
    const resolved = await resolveName(false);
    expect(resolved).toEqual(false);
  });

  it("should return a boolean if gives a boolean (true)", async () => {
    const resolved = await resolveName(false);
    expect(resolved).toEqual(false);
  });

  it("should return a stringified object if gives a object", async () => {
    const resolved = await resolveName({});
    expect(resolved).toEqual("{}");
  });

  it("should return a string if gives a function that returns a string", async () => {
    const resolved = await resolveName(() => "test name");
    expect(resolved).toEqual("test name");
  });

  it("should return a number for a function with subfunction that returns a number", async () => {
    const resolved = await resolveName(() => {
      return () => 1;
    });

    expect(resolved).toEqual(1);
  });

  it("should return a number if gives a function that returns a string", async () => {
    const resolved = await resolveName(() => 1);
    expect(resolved).toEqual(1);
  });

  it("should return a empty string if gives a function that returns null", async () => {
    // @ts-ignore
    const resolved = await resolveName(() => {
      return null;
    });
    expect(resolved).toEqual("");
  });

  it("should return a empty string if gives a function that returns undefined", async () => {
    // @ts-ignore
    const resolved = await resolveName(() => {
      return undefined;
    });
    expect(resolved).toEqual("");
  });

  it("should return a toString array if gives a function that returns array", async () => {
    const resolved = await resolveName(() => [1, 2]);
    expect(resolved).toEqual([1, 2].toString());
  });

  it("should return a boolean if gives a function that returns a boolean (true)", async () => {
    const resolved = await resolveName(() => true);
    expect(resolved).toEqual(true);
  });

  it("should return a boolean if gives a function that returns a boolean (false)", async () => {
    const resolved = await resolveName(() => false);
    expect(resolved).toEqual(false);
  });

  it("should return a stringified object if gives a function that returns a object", async () => {
    const resolved = await resolveName(() => {
      return {};
    });
    expect(resolved).toEqual("{}");
  });

  it("should return a string if gives a async function that returns a string", async () => {
    const resolved = await resolveName(() => Promise.resolve("test name"));
    expect(resolved).toEqual("test name");
  });

  it("should return a number if gives a async function that returns a string", async () => {
    const resolved = await resolveName(() => Promise.resolve(1));
    expect(resolved).toEqual(1);
  });

  it("should return a boolean if gives a async function that returns a boolean (true)", async () => {
    const resolved = await resolveName(() => Promise.resolve(true));
    expect(resolved).toEqual(true);
  });

  it("should return a boolean if gives a async function that returns a boolean (false)", async () => {
    const resolved = await resolveName(() => Promise.resolve(false));
    expect(resolved).toEqual(false);
  });

  it("should return a stringified object if gives a async function that returns a object", async () => {
    const resolved = await resolveName(() => Promise.resolve({}));
    expect(resolved).toEqual("{}");
  });

  it("should return a empty string if gives a async function that returns null", async () => {
    const resolved = await resolveName(() => Promise.resolve(null));
    expect(resolved).toEqual("");
  });

  it("should return a empty string if gives a async function that returns undefined", async () => {
    const resolved = await resolveName(() => Promise.resolve(undefined));
    expect(resolved).toEqual("");
  });

  it("should return a toString array if gives a async function that returns array", async () => {
    const resolved = await resolveName(() => Promise.resolve([1, 2]));
    expect(resolved).toEqual([1, 2].toString());
  });

  it("should return a empty string if the function throws an error", async () => {
    const resolved = await resolveName(() => {
      throw new Error();
    });
    expect(resolved).toEqual("");
  });

  it("should return an empty string if gives null", async () => {
    const resolved = await resolveName(null);
    expect(resolved).toEqual("");
  });

  it("should return an empty string if gives undefined", async () => {
    const resolved = await resolveName(undefined);
    expect(resolved).toEqual("");
  });

  it("should return a toString array if gives an array", async () => {
    const resolved = await resolveName([1, 2]);
    expect(resolved).toEqual([1, 2].toString());
  });
});
