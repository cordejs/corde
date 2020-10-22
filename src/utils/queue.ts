import { List } from "./list";

/**
 * Structure
 */
export class Queue<T extends (...args: any[]) => any> {
  private readonly _list: List<T>;
  private readonly _defaultParameters: List<any>;

  public get defaultParameters() {
    return this._defaultParameters;
  }

  constructor() {
    this._list = new List<T>();
    this._defaultParameters = new List<any>();
  }

  public enqueue(fn: T) {
    this._list.add(fn);
  }

  public dequeue(fn: T) {
    this._list.remove(fn);
  }

  public execute(...params: any[]) {
    const parameters = [...params, ...this._defaultParameters];
    this._list.each(async (fn) => {
      await fn(params);
    });
  }

  public tryExecute(catchAction: (error: any) => any, ...params: any[]) {
    this._list.each(async (fn) => {
      try {
        await fn(params);
      } catch (error) {
        catchAction(error);
      }
    });
  }

  public executeWithCatchCollect(...params: any[]) {
    const errors = new List<Error>();
    this._list.each(async (fn) => {
      try {
        await fn(params);
      } catch (error) {
        errors.add(error);
      }
    });
  }

  public addDefaultParameterToQueue(...parameters: any[]) {
    this._defaultParameters.add(parameters);
  }

  public clearDefaultParameters() {
    this._defaultParameters.clear();
  }
}
