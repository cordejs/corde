class UtilsManager {
  private _delayValue = 800;

  /**
   * Default delay value for Corde interaction with Discord.js
   */
  public get delayValue() {
    return this._delayValue;
  }

  /**
   * Defines a delay for corde interaction with Discord data.
   *
   * If this interaction occur right after a message sending,
   * is possible that the returned value from discord.js is not
   * what is expected
   *
   * This is in a variable and not directly inject in the class due to
   * tests purposes.
   */
  public setDelayValue(value: number) {
    this._delayValue = value;
  }
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

  public isValuePrimitive(value: unknown): value is string | boolean | number {
    return (
      typeof value === "number" ||
      typeof value === "string" ||
      typeof value === "boolean" ||
      typeof value === "bigint"
    );
  }
}

const Utils = new UtilsManager();
export default Utils;
