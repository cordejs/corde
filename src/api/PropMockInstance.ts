/**
 * Class used by mock
 *
 * @internal
 */
export class PropMockInstance<T> {
  private _stackCall: Array<T>;
  private _stackCalled: Array<T>;

  constructor() {
    this._stackCall = [];
    this._stackCalled = [];
  }

  resetStack() {
    this._stackCall.push(...this._stackCalled.map((v) => v));
    this._stackCalled = [];
  }

  addToStack(value: T) {
    this._stackCall.push(value);
  }

  shiftStack() {
    return this._stackCall.shift();
  }

  addToCalledStack(value: T) {
    this._stackCalled.push(value);
  }
}
