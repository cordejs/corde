import { Structure } from "./structure";

export class List<T> implements Structure<T> {
  private _data: T[];

  constructor() {
    this._data = [];
  }

  public find(predicate: (value: T) => boolean) {
    return this._data.find(predicate);
  }

  public clear() {
    this._data = [];
  }

  public clone() {
    return this._data.map((d) => d);
  }

  public add(value: T): void;
  public add(values: T[]): void;
  public add(values: T | T[]) {
    if (!values) {
      return;
    }
    if (this._isArray(values)) {
      (values as T[]).forEach((a) => this._data.push(a));
    } else {
      this._data.push(values);
    }
  }

  public any() {
    return this._data.length > 0;
  }

  public remove(data: T): void;
  public remove(data: T[]): void;
  public remove(data: T | T[]) {
    if (!data) {
      return;
    }
    if (this._isArray(data)) {
      (data as T[]).forEach((d) => this._removeItem(d));
    } else {
      this._removeItem(data);
    }
  }

  public get(index: number[]): T[];
  public get(index: number): T;
  public get(index: number | number[]): T | T[] {
    if (this._isArray(index)) {
      const values: T[] = [];
      index.forEach((i) => values.push(this._data[i]));
      return values;
    } else {
      return this._data[index];
    }
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
