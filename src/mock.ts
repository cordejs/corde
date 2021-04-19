type ReturnValueOrOwnType<T> = T extends (...args: any[]) => any ? ReturnType<T> : T;
type FunctionOrReturnObjType<T> = T extends (...args: any[]) => any ? T : () => T;

const THIS_DEFAULT_NAME = "$mock";

class ObjectMock<T extends Record<string, unknown>, U extends keyof T, Y extends any = T[U]> {
  private _entity: T;
  private _propName: U;
  private _primaryValue: any;
  private _totalCalls: number;
  private _returnValueCalls: number;

  constructor(entity: T, prop: U) {
    this._entity = entity;
    this._propName = prop;
    this._primaryValue = this.prop;
    this._returnValueCalls = 0;
    this._totalCalls = 0;
  }

  get callsCount() {
    return this._totalCalls;
  }

  mockImplementationOnce(fn?: FunctionOrReturnObjType<Y>) {
    return this._mockImplementation(fn, 1);
  }

  mockImplementation(fn?: FunctionOrReturnObjType<Y>, maxCalls?: number) {
    return this._mockImplementation(fn, maxCalls);
  }

  mockReturnValue(newValue: ReturnValueOrOwnType<Y>, maxCalls?: number) {
    this.setThisGetInObject();
    if (typeof this.prop === "function") {
      this.prop = () => {
        return this._mockReturnValue(newValue, maxCalls);
      };
    } else {
      Object.defineProperty(this._entity, this._propName, {
        get: () => {
          return this._mockReturnValue(newValue, maxCalls);
        },
        set: (value: Y) => {
          this.prop = value;
        },
      });
    }
    return this;
  }

  mockReturnValueOnce(newValue: ReturnValueOrOwnType<Y>) {
    this.setThisGetInObject();
    if (typeof this.prop === "function") {
      this.prop = () => {
        return this._mockReturnValue(newValue, 1);
      };
    } else {
      Object.defineProperty(this._entity, this._propName, {
        get: () => {
          return this._mockReturnValue(newValue, 1);
        },
        set: (value: Y) => {
          this.prop = value;
        },
      });
    }
    return this;
  }

  mockResolvedValue(newValue: ReturnValueOrOwnType<Y>) {
    return this._mockReturnValue(Promise.resolve(newValue));
  }

  restore() {
    if (typeof this._primaryValue === "function") {
      this.prop = this._primaryValue;
    } else {
      Object.defineProperty(this._entity, this._propName, {
        get: () => {
          return this._primaryValue;
        },
        set: (value: Y) => {
          this.prop = value;
        },
      });
    }

    return this.restoreCalls();
  }

  restoreCalls() {
    this._returnValueCalls = 0;
    return this;
  }

  private _mockImplementation(fn?: FunctionOrReturnObjType<Y>, maxCalls?: number) {
    if (typeof this.prop === "function") {
      if (fn) {
        this.prop = (...args: any[]) => {
          this._totalCalls++;
          if (!maxCalls || this._returnValueCalls < maxCalls) {
            this._returnValueCalls++;
            return (fn as any)(...args);
          }
          return this._primaryValue(...args);
        };
      } else {
        this.prop = () => {
          this._totalCalls++;
        };
      }
    }
    return this;
  }

  private _mockReturnValue(newValue: Y | Promise<Y>, maxCalls?: number, ...args: any[]) {
    const mock = this.getThisInObject();
    this._totalCalls++;
    if (!maxCalls || mock._returnValueCalls < maxCalls) {
      mock._returnValueCalls++;
      return newValue;
    }

    if (typeof this._primaryValue === "function") {
      return this._primaryValue(...args);
    }
    return this._primaryValue;
  }

  private getThisInObject() {
    return this._entity[THIS_DEFAULT_NAME] as ObjectMock<T, U, Y>;
  }

  private setThisGetInObject() {
    Object.defineProperty(this._entity, THIS_DEFAULT_NAME, { get: () => this });
  }

  private get prop() {
    return this._entity[this._propName];
  }

  private set prop(newValue: any) {
    this._entity[this._propName] = newValue;
  }
}

export function createMock<T extends Record<string, unknown>, U extends keyof T>(
  object: T,
  prop: U,
) {
  return new ObjectMock(object, prop);
}
