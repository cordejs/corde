import { Timer, wait } from "../../src/utils";

describe("testing timer class", () => {
  it("should get instance of Timer", () => {
    expect(new Timer()).toBeInstanceOf(Timer);
  });

  it("should init and end a timer", async () => {
    const timer = new Timer();
    timer.start();
    await wait(100);
    const value = timer.stop();
    expect(value[1]).toBeGreaterThan(0);
    expect(value[0]).toContain("ms");
  });
});
