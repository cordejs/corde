/**
 * @internal
 */
export class Validator<TParameters extends any[]> {
  private _validators: ((...params: TParameters) => boolean)[];

  constructor() {
    this._validators = [];
  }

  add(fn: (...params: TParameters) => boolean) {
    this._validators.push(fn);
  }

  /**
   * Check if some properties are valid givin some validations.
   * @param params Parameters of the function
   * @returns If the parameters are valid.
   */
  isValid(...params: TParameters) {
    for (let i = 0; i < this._validators.length; i++) {
      if (!this._validators[i](...params)) {
        return false;
      }
    }
    return true;
  }
}
