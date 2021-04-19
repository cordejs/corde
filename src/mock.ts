type ReturnValueOrOwnType<T> = T extends (...args: any[]) => any ? ReturnType<T> : T;

const THIS_DEFAULT_NAME = "$mock";

class ObjectMock<T extends Record<string, unknown>, U extends keyof T, Y = T[U]> {
  private _entity: T;
  private _propName: U;
  private _primaryValue: any;
  private _returnValueCalls: number;

  constructor(entity: T, prop: U) {
    this._entity = entity;
    this._propName = prop;
    this._primaryValue = this.prop;
    this._returnValueCalls = 0;
  }

  mockReturnValue(newValue: ReturnValueOrOwnType<Y>, maxCalls?: number) {
    this.setThisGetInObject();
    if (typeof this.prop === "function") {
      this.prop = () => {
        return this.implementReturnValue(newValue, maxCalls);
      };
    } else {
      Object.defineProperty(this._entity, this._propName, {
        get: () => {
          return this.implementReturnValue(newValue, maxCalls);
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
        return this.implementReturnValue(newValue, 1);
      };
    } else {
      Object.defineProperty(this._entity, this._propName, {
        get: () => {
          return this.implementReturnValue(newValue, 1);
        },
        set: (value: Y) => {
          this.prop = value;
        },
      });
    }
    return this;
  }

  restore() {
    Object.defineProperty(this._entity, this._propName, {
      get: () => {
        return this._primaryValue;
      },
      set: (value: Y) => {
        this.prop = value;
      },
    });
    return this.restoreCalls();
  }

  restoreCalls() {
    this._returnValueCalls = 0;
    return this;
  }

  private implementReturnValue(newValue: Y, maxCalls?: number) {
    const mock = this.getThisInObject();
    mock._returnValueCalls++;
    if (!maxCalls || mock._returnValueCalls <= maxCalls) {
      return newValue;
    }

    if (typeof this._primaryValue === "function") {
      return this._primaryValue();
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
