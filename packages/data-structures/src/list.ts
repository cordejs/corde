/**
 * List if an encapsulation of [Array](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array).
 * It's contains some others functions that are no present in Array itself
 * While provide access direct to main Array functions.
 *
 * The main goal is to reduce the acess to no relevant functions provided by Array and
 * specialize this class in iteration adition, reduction and search of elements.
 */
export class List<T> {
  private _data: T[];

  /**
   * Initialize a new List.
   */
  constructor() {
    this._data = [];
  }

  /**
   * Converts a array to List.
   * It do not modify the current values of the list.
   * @param data Array with values to be converted.
   * @returns A new instance of List. (The list has no references this instance).
   */
  public arrayToList(data: T[]): List<T> {
    const newList = new List<T>();
    for (const val of data) {
      newList.add(val);
    }
    return newList;
  }

  /**
   * Get the first elements that match with the predicate
   * does the same of [Array.find](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
   * @param predicate Comparator to find the element.
   * @returns The first element of the list that match with the predicate,
   * or null.
   */
  public single(predicate: (value: T) => boolean): T {
    return this._data.find(predicate) ?? null;
  }

  /**
   * Same of
   * [Array.filter](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro).
   * Finds a List of elements that match with a predicate.
   * @param predicate Comparator to find the elements.
   * @returns An list of all elements that match with the predicate.
   * returns an empty list if no element was found.
   */
  public filter(predicate: (value: T) => boolean): List<T> {
    const arr = this._data.filter(predicate);
    return this.arrayToList(arr);
  }

  /**
   * Picks the **first** element of the list, or null if no element exists.
   * @returns The first element or undefined if no element exists.
   */
  public first(): T | undefined {
    return this._data[0];
  }

  /**
   * Picks the **last** element of the list, or undefined if no element exists.
   * @returns The last element of the list of undefined if no element exists.
   */
  public last(): T | undefined {
    return this._data[this._data.length - 1];
  }

  /**
   * Removes all elements of the list.
   * @returns This instance.
   */
  public clear(): List<T> {
    this._data = [];
    return this;
  }

  /**
   * Copy all elements of the list to a new List.
   * @returns The cloned list.
   */
  public clone(): List<T> {
    return this.arrayToList(this._data.map((d) => d));
  }

  /**
   * Do a operation for each element of the list.
   * Same of [Array.foreach](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
   * @param operation Operation to execute in each element.
   * @returns this instance.
   */
  public each(operation: (val: T) => void): List<T> {
    for (const obj of this._data) {
      operation(obj);
    }
    return this;
  }

  /**
   * Select all properties informed in parameter that are contained in
   * the List object.
   * @param keys Properties of T to be picked.
   * @returns All picked properties of T in a new List.
   * Returns an empty list of no element was found.
   */
  public select<K extends keyof T>(...keys: K[]): List<Pick<T, K>> {
    const newList = new List<Pick<T, K>>();
    for (const obj of this._data) {
      const copy = {} as Pick<T, K>;
      keys.forEach((key) => (copy[key] = obj[key]));
      newList.add(copy);
    }
    return newList;
  }

  /**
   * Add a new element to list.
   * Note: undefined or null elements are not added.
   * @param values The new element.
   * @returns This instance.
   */
  public add(...values: T[]): List<T> {
    for (const val of values) {
      if (val) {
        this._data.push(val);
      }
    }
    return this;
  }

  /**
   * Checks if the list has at least one element.
   * @returns True if there are elements in list, false if don't.
   */
  public any() {
    return this._data.length > 0;
  }

  /**
   * Removes a element from the list.
   * @param data Element to be removed.
   * @returns This instance.
   */
  public remove(data: T): List<T>;
  /**
   * Removes an array of elements from the list.
   * @param data Array of elements.
   * @returns This instance.
   */
  public remove(data: T[]): List<T>;
  /**
   * Removes an list of elements from the list.
   * @param data List of elements.
   * @returns This instance.
   */
  public remove(data: List<T>): List<T>;
  public remove(data: T | T[] | List<T>) {
    if (!data) {
      return this;
    }
    if (this._isArray(data) || data instanceof List) {
      (data as T[]).forEach((d) => this._removeItem(d));
      return this;
    } else {
      this._removeItem(data);
      return this;
    }
  }

  /**
   * Get a element based on its **index**.
   * @param index Position in list of the element
   * @returns The element in the position informed.
   */
  public get(index: number): T;
  /**
   * Get a list of elements based in their **index**.
   * @param index Position of each element in list.
   * @returns A list with each element informed in array.
   * No existing elements will be ignored in adition on list.
   */
  public get(...index: number[]): List<T>;
  public get(index: number | number[]): T | List<T> {
    if (this._isArray(index)) {
      const values = new List<T>();
      for (const i of index) {
        const element = this._data[i];
        if (element) {
          values.add(element);
        }
      }
      return values;
    } else {
      return this._data[index];
    }
  }

  /**
   * Returns the index of the first element that matchs with the informed element.
   * Same of [Array.indexOf](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).
   * @param element Element to have its index searched.
   * @returns Index of the searched element.
   */
  public indexOf(element: T): number {
    return this._data.indexOf(element);
  }

  public has(element: T) {
    return !!this._data.find((d) => d === element);
  }

  private _removeItem(data: T) {
    const index = this._data.indexOf(data, 0);
    if (index > -1) {
      this._data.slice(index, 1);
    }
  }

  private _isArray(content: any | any[]): content is any[] {
    return Array.isArray(content);
  }
}
