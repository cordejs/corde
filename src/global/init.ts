import * as hooks from "../hooks";
import * as closures from "../closures";
import { BotAPI, ConfigAPI } from "../api";
import { runtime } from "../common/runtime";
import { IConfigOptions } from "../types";
import { expect } from "../expect";
import { command } from "../command";

function getGlobal() {
  return global as any;
}

function getConfigs(): Readonly<Required<IConfigOptions>> {
  return new ConfigAPI(runtime.configs);
}

function getBot() {
  return new BotAPI(runtime.bot);
}

function addToGlobalScope(name: string, value: any) {
  getGlobal()[name] = value;
}

export default function init() {
  Object.getOwnPropertyNames(hooks).forEach((hookName) => {
    addToGlobalScope(hookName, (hooks as any)[hookName]);
  });

  Object.getOwnPropertyNames(closures).forEach((closureName) => {
    addToGlobalScope(closureName, (closures as any)[closureName]);
  });

  addToGlobalScope("expect", expect);
  addToGlobalScope("command", command);

  addToGlobalScope("bot", getBot());
  addToGlobalScope("configs", getConfigs());
}
