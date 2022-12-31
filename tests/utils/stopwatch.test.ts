import { Stopwatch } from "../../src/utils/Stopwatch";
import { wait } from "../../src/utils/wait";

describe("testing timer class", () => {
  it("should get instance of Stopwatch", () => {
    expect(new Stopwatch()).toBeInstanceOf(Stopwatch);
  });

  it("should not start again a stopwatch after it already was started", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    const date = stopwatch["_startTime"];
    stopwatch.start();
    const date2 = stopwatch["_startTime"];
    expect(date).toEqual(date2);
  });

  it("should init and end the stopwatch", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    await wait(100);
    const value = stopwatch.stop();
    expect(value[1]).toBeGreaterThan(0);
    expect(value[0]).toContain("ms");
  });

  it("elapsedInMilliseconds should be equal to value returned by stop()[1] function", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    await wait(100);
    const val = stopwatch.stop();
    expect(val[1]).toEqual(stopwatch.elapsedInMilliseconds);
  });

  it("elapsedInMilliseconds should be equal to 0 as stopwatch wasn't started", async () => {
    const stopwatch = new Stopwatch();
    expect(stopwatch.elapsedInMilliseconds).toEqual(0);
  });

  it("elapsedFormatted should be equal to '0ms' as stopwatch wasn't started", async () => {
    const stopwatch = new Stopwatch();
    expect(stopwatch.elapsedFormatted).toEqual("0ms");
  });

  it("elapsedInMilliseconds should be greater than 0 as stopwatch started but not stop", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    await wait(100);
    expect(stopwatch.elapsedInMilliseconds).toBeGreaterThan(0);
  });

  it("elapsedFormatted should be different than '0ms' as stopwatch has started but not stop", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    await wait(100);
    expect(stopwatch.elapsedInMilliseconds).not.toEqual("0ms");
  });

  it("elapsedFormatted should be equal to value returned by stop()[0] function", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    await wait(100);
    const val = stopwatch.stop();
    expect(val[0]).toEqual(stopwatch.elapsedFormatted);
  });

  it("startNew should return a fresh new instance already running", async () => {
    const stopwatch = new Stopwatch();
    const newInstance = stopwatch.startNew();
    expect(newInstance.isRunning).toBeTruthy();
    expect(newInstance).not.toEqual(stopwatch);
  });

  it("stop the stopwatch without starting it should return ['0ms', 0]", async () => {
    const stopwatch = new Stopwatch();
    const val = stopwatch.stop();
    expect(val[0]).toEqual("0ms");
    expect(val[1]).toEqual(0);
  });

  it("reset() should set both startTime and endTime to undefined", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    await wait(100);
    stopwatch.stop();
    stopwatch.reset();
    expect(stopwatch["_startTime"]).toBeFalsy();
    expect(stopwatch["_endTime"]).toBeFalsy();
  });

  it("restart() should set both endTime to undefined, and re-init startTime", async () => {
    const stopwatch = new Stopwatch();
    stopwatch.start();
    const currentStartTime = stopwatch["_startTime"];
    await wait(100);
    stopwatch.stop();
    stopwatch.restart();
    expect(currentStartTime).not.toEqual(stopwatch["_startTime"]);
    expect(stopwatch["_endTime"]).toBeFalsy();
  });
});
