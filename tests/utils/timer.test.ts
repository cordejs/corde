import { Timer } from "../../src/utils/Timer";
import { wait } from "../../src/utils/wait";

describe("testing timer class", () => {
  it("should get instance of Timer", () => {
    expect(new Timer()).toBeInstanceOf(Timer);
  });

  it("should not start again a timer after it already was started", async () => {
    const timer = new Timer();
    timer.start();
    const date = timer["_startTime"];
    timer.start();
    const date2 = timer["_startTime"];
    expect(date).toEqual(date2);
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
