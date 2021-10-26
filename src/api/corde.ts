import { runtime, testCollector } from "../core";
import { FunctionOnly } from "../types";
import { getStackTrace } from "../utils";
import { CommandEvent } from "./CommandEvent";

type CordeType = FunctionOnly<typeof corde>;

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
    const promise = runtime.bot.sendMessage(command);
    return new CommandEvent(promise);
  },
  waitAsync(time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, time);
    });
  },
};
