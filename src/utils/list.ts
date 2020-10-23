/**
 * List if an extension of [Array](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array).
 * It's contains some others functions that are no present in Array itself
 * While provide access direct to main Array functions.
 *
 * The main goal is to reduce the access to no relevant functions provided by Array and
 * specialize this class in iteration addition, reduction and search of elements.
 */
export class List<T> extends Array<T> {
  /**
   * Converts a array to List.
   * It do not modify the current values of the list.
   * @param data Array with values to be converted.
   * @returns A new instance of List. (The list has no references this instance).
   */
  public arrayToList<U extends any>(data: U[]): List<U> {
    const newList = new List<U>();
    for (const val of data) {
      newList.push(val);
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
    return this.find(predicate) ?? null;
  }

  /**
   * Picks the **first** element of the list, or null if no element exists.
   * @returns The first element or undefined if no element exists.
   */
  public first(): T | undefined {
    return this[0];
  }

  /**
   * Picks the **last** element of the list, or undefined if no element exists.
   * @returns The last element of the list of undefined if no element exists.
   */
  public last(): T | undefined {
    return this[this.length - 1];
  }

  /**
   * Removes all elements of the list.
   * @returns This instance.
   */
  public clear(): List<T> {
    while (this.length > 0) {
      this.pop();
    }
    return this;
  }

  /**
   * Copy all elements of the list to a new List.
   * @returns The cloned list.
   */
  public clone(): List<T> {
    return this.arrayToList(this.map((d) => d));
  }

  /**
   * Select all properties informed in parameter that are contained in
   * the List object.
   * @param keys Properties of T to be picked.
   * @returns All picked properties of T in a new List.
   * Returns an empty list of no element was found.
   */
  public pick<K extends keyof T>(...keys: K[]): List<Pick<T, K>> {
    const newList = new List<Pick<T, K>>();
    for (const obj of this) {
      const copy = {} as Pick<T, K>;
      keys.forEach((key) => (copy[key] = obj[key]));
      newList.push(copy);
    }
    return newList;
  }

  /**
   * Checks if the list has at least one element.
   * @returns True if there are elements in list, false if don't.
   */
  public any() {
    return this.length > 0;
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
   * No existing elements will be ignored in addition on list.
   */
  public get(...index: number[]): List<T>;
  public get(index: number | number[]): T | List<T> {
    if (this._isArray(index)) {
      const values = new List<T>();
      for (const i of index) {
        const element = this[i];
        if (element) {
          values.push(element);
        }
      }
      return values;
    } else {
      return this[index];
    }
  }

  public has(element: T) {
    return !!this.find((d) => d === element);
  }

  public size() {
    return this.length;
  }

  public take(from?: number, amount?: number) {
    if (from && amount > 0) {
      const returnList = new List<T>();
      for (let i = from; i < this.length; i++) {
        if (returnList.size() === amount) {
          return returnList;
        }
        returnList.push(this[i]);
      }
    }
    return this;
  }

  private _removeItem(data: T) {
    const index = this.indexOf(data, 0);
    if (index > -1) {
      this.slice(index, 1);
    }
  }

  private _isArray(content: any | any[]): content is any[] {
    return Array.isArray(content);
  }
}
