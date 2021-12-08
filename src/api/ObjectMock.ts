import { GenericFunction } from "../types";
import { PropMockInstance } from "./PropMockInstance";

const THIS_DEFAULT_NAME = "$mock";

export class ObjectMock<
  TEntity extends Record<string, unknown>,
  TKeyEntity extends keyof TEntity,
  TProp extends any = TEntity[TKeyEntity],
> implements corde.IMockInstance<TEntity, TKeyEntity, TProp>
{
  private _entity: TEntity;
  private _propName: TKeyEntity;
  private _primaryValue: any;

  private _totalCalls: number;
  private _instanceCalls!: number;

  private _implementationReference: PropMockInstance<GenericFunction>;
  private _returnValueReference: PropMockInstance<any>;

  constructor(entity: TEntity, prop: TKeyEntity) {
    this._entity = entity;
    this._propName = prop;
    this._primaryValue = this.prop;

    this._totalCalls = 0;

    this._instanceCalls = 0;

    this._implementationReference = new PropMockInstance<GenericFunction>();
    this._returnValueReference = new PropMockInstance<any>();
  }

  get callsCount() {
    return this._totalCalls;
  }

  get instanceCallsCount() {
    return this._instanceCalls;
  }

  setImplementationOnce(fn?: corde.FunctionOrReturnObjType<TProp>) {
    return this._mockImplementation(fn, 1);
  }

  setImplementation(fn?: corde.FunctionOrReturnObjType<TProp>, maxCalls?: number) {
    return this._mockImplementation(fn, maxCalls);
  }

  setReturnValue(newValue: corde.ReturnValueOrOwnType<TProp>, maxCalls?: number) {
    return this._mockReturnValue(newValue, maxCalls);
  }

  setReturnValueOnce(newValue: corde.ReturnValueOrOwnType<TProp>) {
    return this._mockReturnValue(newValue, 1);
  }

  setResolvedValue(newValue: corde.ResolvedValue<TProp>, maxCalls?: number) {
    return this._mockImplementation(() => {
      return Promise.resolve(newValue);
    }, maxCalls);
  }

  setResolvedValueOnce(newValue: corde.ResolvedValue<TProp>) {
    return this._mockImplementation(() => {
      return Promise.resolve(newValue);
    }, 1);
  }

  setRejectedValue(newValue: corde.RejectedValue<TProp>, maxCalls?: number) {
    return this._mockImplementation(() => {
      return Promise.resolve(newValue);
    }, maxCalls);
  }

  setRejectedValueOnce(newValue: corde.RejectedValue<TProp>) {
    return this._mockImplementation(() => {
      return Promise.reject(newValue);
    }, 1);
  }

  restore() {
    if (typeof this._primaryValue === "function") {
      this.prop = this._primaryValue;
    } else {
      Object.defineProperty(this._entity, this._propName, {
        get: () => {
          return this._primaryValue;
        },
        set: (value: TProp) => {
          this.prop = value;
        },
      });
    }

    return this.restoreCalls();
  }

  restoreCalls() {
    this._instanceCalls = 0;
    this._returnValueReference.resetStack();
    this._implementationReference.resetStack();
    return this;
  }

  private _mockImplementation(
    fn?: corde.FunctionOrReturnObjType<TProp> | (() => Promise<any>),
    maxCalls?: number,
  ) {
    const fnToAdd =
      fn ??
      (() => {
        return null;
      });
    this.addInArray(this._implementationReference, fnToAdd, maxCalls);

    this.prop = (...args: any[]) => {
      this._totalCalls++;
      this._instanceCalls++;
      return this.callNextFunction(maxCalls, fn ?? (() => null), ...args);
    };
    return this;
  }

  private _mockReturnValue(
    newValue: corde.ReturnValueOrOwnType<TProp> | PromiseLike<any>,
    maxCalls?: number,
  ) {
    this.addInArray(this._returnValueReference, newValue, maxCalls);
    this.setThisGetInObject();
    if (typeof this.prop === "function") {
      this.prop = () => {
        return this._getReturnValue(newValue, maxCalls);
      };
    } else {
      Object.defineProperty(this._entity, this._propName, {
        get: () => {
          return this._getReturnValue(newValue, maxCalls);
        },
        set: (value: TProp) => {
          this.prop = value;
        },
      });
    }
    return this;
  }

  private _getReturnValue(
    newValue: corde.ReturnValueOrOwnType<TProp> | PromiseLike<any>,
    maxCalls?: number,
    ...args: any[]
  ) {
    const mock = this.getThisInObject();
    this._totalCalls++;
    mock._instanceCalls++;
    return this.callNextReturnValue(maxCalls, newValue, ...args);
  }

  private callNextReturnValue(
    maxCalls: number | undefined,
    newValue: corde.ReturnValueOrOwnType<TProp> | PromiseLike<any>,
    ...args: any[]
  ) {
    const returnValue = this._returnValueReference.shiftStack();

    if (returnValue) {
      this._returnValueReference.addToCalledStack(returnValue);
      return returnValue;
    }

    if (!maxCalls || this._instanceCalls < maxCalls) {
      return newValue;
    }

    if (typeof this._primaryValue === "function") {
      return this._primaryValue(...args);
    }
    return this._primaryValue;
  }

  private addInArray(instance: PropMockInstance<any>, value: any, repeatTimes?: number) {
    if (!repeatTimes) {
      instance.addToStack(value);
    } else {
      for (let index = 0; index < repeatTimes; index++) {
        instance.addToStack(value);
      }
    }
  }

  private callNextFunction(maxCalls: number | undefined, fn: GenericFunction, ...args: any[]) {
    const stackFunction = this._implementationReference.shiftStack();

    if (stackFunction) {
      this._implementationReference.addToCalledStack(stackFunction);
      return stackFunction(...args);
    }

    if (!maxCalls || this._instanceCalls < maxCalls) {
      return fn(...args);
    }

    return this._primaryValue(...args);
  }

  private getThisInObject() {
    return this._entity[THIS_DEFAULT_NAME] as ObjectMock<TEntity, TKeyEntity, TProp>;
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
