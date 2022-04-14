import { Constructor } from "../../../types";

export namespace eventFactory {
  const cache: any[] = [];

  export function findOrConstruct<T>(type: Constructor<T>, ...params: any[]): T {
    let instance = cache.find((c) => c instanceof type);

    if (instance) {
      return instance;
    }

    instance = new type(...params);
    cache.push(instance);
    return instance;
  }
}
