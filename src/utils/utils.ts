class UtilsManager {
  /**
   * Pick some properties of a object
   *
   * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#picktk
   * @param obj Object to get its properties
   * @param keys Properties that must be got
   */
  public pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const copy = {} as Pick<T, K>;
    keys.forEach((key) => (copy[key] = obj[key]));
    return copy;
  }

  /**
   * Creates a promise that finish after a defined time in milliseconds
   * @param timeMilliseconds Time to the promise wait.
   */
  public wait(timeMilliseconds: number) {
    return new Promise<void>((resolve, reject) => {
      if (!timeMilliseconds) {
        return reject(new Error("Invalid value"));
      }

      if (timeMilliseconds < 0) {
        return reject(new Error("Time can not be lower than 0"));
      }

      setTimeout(() => {
        resolve();
      }, timeMilliseconds);
    });
  }
}

const Utils = new UtilsManager();
export default Utils;
