import { default as _logUpdate } from "log-update";

export class LogUpdate {
  private _logValue: string[];
  private _stder: string;

  get stder() {
    return this._stder;
  }

  constructor() {
    this._logValue = [];
    this._stder = "";
  }

  /**
   * Add a data to the updatable log, returning the item position
   * in the log.
   * @param value New data to add to log.
   */
  append(value: string) {
    const newLength = this._logValue.push(value);
    this.print();
    return newLength - 1;
  }

  appendLine(value: string) {
    return this.append("\n" + value);
  }

  update(index: number, newValue: string) {
    if (index < 0 || index > this._logValue.length - 1) {
      return;
    }
    this._logValue[index] = newValue;
    this.print();
  }

  updateLine(index: number, newValue: string) {
    this.update(index, "\n" + newValue);
  }

  persist() {
    _logUpdate.done();
    this._stder += this.getlogValueString();
    this._logValue = [];
  }

  private getlogValueString() {
    return this._logValue.join("");
  }

  private print() {
    _logUpdate(this.getlogValueString());
  }
}
