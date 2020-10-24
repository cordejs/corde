import { Guid } from "./guid";
import { List } from "./list";

/**
 * Structure to handle a collection of functions and execute then.
 * This structure does not remove its values after its executions.
 */
export class Queue<T extends (...args: any[]) => any> {
  private readonly _funcs: Map<string, T>;
  private readonly _defaultParameters: List<any>;

  /**
   * Gets default parameters added.
   */
  public get defaultParameters() {
    return this._defaultParameters;
  }

  constructor() {
    this._funcs = new Map<string, T>();
    this._defaultParameters = new List<any>();
  }

  /**
   * Add a function to queue.
   *
   * @param fn Functions to be queued
   */
  public enqueue(fn: T) {
    const guid = Guid.new();
    this._funcs.set(guid, fn);
    return guid;
  }

  /**
   * Removes a function from queue
   * @param fn Function to be removed from queue.
   */

  public dequeue(guid: string) {
    return this._funcs.delete(guid);
  }

  /**
   * Execute functions with parameters.
   * @param params Parameters to be injected on function in queue.
   */
  public async executeAsync<K extends Parameters<T>, U extends ReturnType<T>>(
    ...params: K
  ): Promise<List<U>> {
    const parameters = [...params, ...this._defaultParameters];
    const returnList = new List<U>();

    for (const [guid, fn] of this._funcs) {
      const value = await fn(...parameters);
      if (value) {
        returnList.push(value);
      }
    }
    return returnList;
  }

  /**
   * Execute functions with parameters.
   * @param params Parameters to be injected on function in queue.
   */
  public executeSync<K extends Parameters<T>, U extends ReturnType<T>>(...params: K): List<U> {
    const parameters = [...params, ...this._defaultParameters];
    const returnList = new List<U>();

    for (const [guid, fn] of this._funcs) {
      const value = fn(...parameters);
      if (value) {
        returnList.push(value);
      }
    }

    return returnList;
  }

  /**
   * Execute function with exception treatment.
   * So if any function throw a error, it will be handled by an catch function
   * provided in parameters.
   * @param catchAction Function to handle errors.
   * @param params Parameters to the functions.
   */
  public tryExecuteSync<K extends Parameters<T>, U extends ReturnType<T>>(
    catchAction: (error: any) => any,
    ...params: K
  ) {
    const returnValues = new List<U>();
    this._funcs.forEach((fn) => {
      try {
        const value = fn(params);
        if (value) {
          returnValues.push(value);
        }
      } catch (error) {
        catchAction(error);
      }
    });
    return returnValues;
  }

  /**
   * Execute function with exception treatment.
   * So if any function throw a error, it will be handled by an catch function
   * provided in parameters.
   * @param catchAction Function to handle errors.
   * @param params Parameters to the functions.
   */
  public async tryExecuteAsync<K extends Parameters<T>, U extends ReturnType<T>>(
    catchAction: (error: any) => any,
    ...params: K
  ) {
    const returnValues = new List<U>();
    this._funcs.forEach(async (fn) => {
      try {
        const value = await fn(params);
        if (value) {
          returnValues.push(value);
        }
      } catch (error) {
        catchAction(error);
      }
    });
    return returnValues;
  }

  /**
   * Function like *tryExecute()* but return all exceptions if they
   * occur.
   * @param params Parameters to the functions.
   */
  public executeWithCatchCollectSync(...params: any[]) {
    const errors = new List<any>();
    this._funcs.forEach((fn) => {
      try {
        fn(params);
      } catch (error) {
        errors.push(error);
      }
    });
    return errors;
  }

  /**
   * Function like *tryExecute()* but return all exceptions if they
   * occur.
   * @param params Parameters to the functions.
   */
  public executeWithCatchCollectAsync(...params: any[]) {
    const errors = new List<any>();
    this._funcs.forEach(async (fn) => {
      try {
        await fn(params);
      } catch (error) {
        errors.push(error);
      }
    });
    return errors;
  }

  public size() {
    return this._funcs.size;
  }

  public clear() {
    return this._funcs.clear();
  }
}
