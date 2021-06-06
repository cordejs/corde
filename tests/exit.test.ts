import { exit } from "../src/exit";

describe("testing exit function", () => {
  it("should call process.exit", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spy = jest.spyOn(process, "exit").mockImplementation(() => null);
    exit(1);
    expect(spy).toBeCalled();
  });
});
