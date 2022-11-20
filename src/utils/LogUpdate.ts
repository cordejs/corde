import _logUpdate from "log-update";

export class LogUpdate {
  private _logValue: string[];
  private _stdout: string;

  get stdout() {
    return this._stdout;
  }

  constructor() {
    this._logValue = [];
    this._stdout = "";
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

  clear() {
    _logUpdate.clear();
    this._logValue = [];
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
    this._stdout += this.getLogValueString();
    this._logValue = [];
  }

  private getLogValueString() {
    return this._logValue.join("");
  }

  private print() {
    _logUpdate(this.getLogValueString());
  }
}
