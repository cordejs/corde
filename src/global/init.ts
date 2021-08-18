import * as hooks from "../hooks";
import * as closures from "../closures";

function getGlobal() {
  return global as any;
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
}
