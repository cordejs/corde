import { Message } from "discord.js";
import { runtime, testCollector } from "../core";
import { getStackTrace } from "../utils";

export const corde = {
  fail: function (message: string) {
    if (!testCollector.isInsideTestClausure) {
      throw new Error("Can not fail a suite without being inside a suite");
    }

    runtime.internalEvents.emit("suite_forced_fail", {
      message: "Failed: " + message,
      pass: false,
      trace: getStackTrace(),
    });
  },
  wait: function (time: number) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, time);
  },
  send(command: string) {
    const promise = runtime.bot.sendMessage(command);
    return new CommandEvent(promise);
  },
  waitAsync: function (time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, time);
    });
  },
};

const commandEvent = corde.send("a");
const message = await commandEvent.waitMessage();
