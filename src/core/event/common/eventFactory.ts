export namespace eventFactory {
  const cache: any[] = [];

  export function findOrConstruct<T extends new (...args: any[]) => any>(
    type: T,
    ...params: ConstructorParameters<T>
  ): InstanceType<T> {
    let instance = cache.find((c) => c instanceof type);

    if (instance) {
      return instance;
    }

    instance = new type(...params);
    cache.push(instance);
    return instance;
  }
}
