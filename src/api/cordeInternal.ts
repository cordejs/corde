import runtime from "../core/runtime";
import { MapObj } from "../types";
import { getStackTrace } from "../utils/getStackTrace";
import { BotAPI } from "./botAPI";
import { ConfigAPI } from "./configAPI";
import { cordeEvent } from "./cordeEvent";
import { ObjectMock } from "./ObjectMock";

type CordeType = MapObj<typeof corde>;

const bot = new BotAPI(runtime.bot);
const config = new ConfigAPI(runtime.configs);

/**
 * @global
 */
export const cordeInternal: CordeType = {
  fail(message?: string) {
    if (!runtime.testCollector.isInsideTestClosure) {
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
  waitAsync(time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, time);
    });
  },
  send(command: string) {
    return runtime.bot.sendMessage(command);
  },
  mock<TEntity extends Record<string, unknown>, U extends keyof TEntity>(
    object: TEntity,
    prop: U,
  ): ObjectMock<TEntity, U> {
    const mockInstance = new ObjectMock(object, prop);
    runtime.addMock(mockInstance);
    return mockInstance;
  },
  events: {
    ...cordeEvent,
  },
  bot: bot,
  config: config,
};
