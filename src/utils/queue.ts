import { List } from "./list";

/**
 * Structure to handle a collection of functions and execute then.
 * This structure does not remove its values after its executions.
 */
export class Queue<T extends (...args: any[]) => any> {
  private readonly _list: List<T>;
  private readonly _defaultParameters: List<any>;

  /**
   * Gets default parameters added.
   */
  public get defaultParameters() {
    return this._defaultParameters;
  }

  constructor() {
    this._list = new List<T>();
    this._defaultParameters = new List<any>();
  }

  /**
   * Add a function to queue.
   *
   * @param fn Functions to be queued
   */
  public enqueue(fn: T) {
    this._list.push(fn);
  }

  /**
   * Removes a function from queue
   * @param fn Function to be removed from queue.
   */
  public dequeue(fn: T) {
    this._list.remove(fn);
  }

  /**
   * Execute functions with parameters.
   * @param params Parameters to be injected on function in queue.
   */
  public execute(...params: any[]) {
    const parameters = [...params, ...this._defaultParameters];
    this._list.forEach(async (fn) => {
      await fn(parameters);
    });
  }

  /**
   * Execute function with exception treatment.
   * So if any function throw a error, it will be handled by an catch function
   * provided in parameters.
   * @param catchAction Function to handle errors.
   * @param params Parameters to the functions.
   */
  public tryExecute(catchAction: (error: any) => any, ...params: any[]) {
    this._list.forEach(async (fn) => {
      try {
        await fn(params);
      } catch (error) {
        catchAction(error);
      }
    });
  }

  /**
   * Function like *tryExecute()* but return all exceptions if they
   * occur.
   * @param params Parameters to the functions.
   */
  public executeWithCatchCollect(...params: any[]) {
    const errors = new List<Error>();
    this._list.forEach(async (fn) => {
      try {
        await fn(params);
      } catch (error) {
        errors.push(error);
      }
    });
  }

  public size() {
    return this._list.size();
  }

  public clear() {
    return this._list.clear();
  }
}
