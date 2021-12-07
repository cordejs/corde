import { runtime, testCollector } from "../core";
import { MapObj } from "../types";
import { getStackTrace } from "../utils";
import { cordeEvent } from "./cordeEvent";

type CordeType = MapObj<typeof corde>;

/**
 * @global
 */
export const cordeInternal: CordeType = {
  fail(message?: string) {
    if (!testCollector.isInsideTestClausure) {
      throw new Error("Can not fail a suite without being inside a suite");
    }

    runtime.internalEvents.emit("suite_forced_fail", {
      message: "Failed: " + message,
      pass: false,
      trace: getStackTrace(),
    });
  },
  wait(time: number) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, time);
  },
  send(command: string) {
    return runtime.bot.sendMessage(command);
  },
  events: {
    ...cordeEvent,
  },
  waitAsync(time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, time);
    });
  },
};
