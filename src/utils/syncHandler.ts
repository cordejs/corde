export function syncHandler<T extends (...args: any) => any, U extends any>(
  fn: T,
): [ReturnType<T> | undefined, U | undefined] {
  try {
    return [fn(), undefined];
  } catch (error) {
    return [undefined, error];
  }
}
