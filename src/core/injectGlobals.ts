import { cordeInternal } from "../api";
import runtime from "./runtime";
import * as hooks from "../hooks";
import * as closures from "../hooks";
import { expect } from "../expect";
import { command } from "../command";
import { BotAPI } from "../api/botAPI";

function getGlobal() {
  return global as any;
}

function addToGlobalScope(name: string, value: any) {
  getGlobal()[name] = value;
}

export function injectGlobals() {
  Object.getOwnPropertyNames(hooks).forEach((hookName) => {
    addToGlobalScope(hookName, (hooks as any)[hookName]);
  });

  Object.getOwnPropertyNames(closures).forEach((closureName) => {
    addToGlobalScope(closureName, (closures as any)[closureName]);
  });

  addToGlobalScope("expect", expect);
  addToGlobalScope("command", command);
  addToGlobalScope("con", command);
  addToGlobalScope("corde", cordeInternal);
  addToGlobalScope("bot", new BotAPI(runtime.bot));
}
