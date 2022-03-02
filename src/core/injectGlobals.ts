import { cordeInternal } from "../api";

function getGlobal() {
  return global as any;
}

function addToGlobalScope(name: string, value: any) {
  getGlobal()[name] = value;
}

export async function injectGlobals() {
  const hooks = await import("../hooks");
  const closures = await import("../closures");
  const { expect } = await import("../expect");
  const { command } = await import("../command");

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
}
