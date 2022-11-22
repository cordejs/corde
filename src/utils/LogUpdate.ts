import _logUpdate from "log-update";

export class LogUpdate {
  private _logValue: string[];
  private _stdout: string;
  private _log: _logUpdate.LogUpdate;

  get stdout() {
    return this._stdout;
  }

  constructor() {
    this._logValue = [];
    this._stdout = "";
    this._log = _logUpdate.create(process.stdout);
  }

  /**
   * Add a data to the updatable log, returning the item position
   * in the log.
   * @param values New data to add to log.
   */
  append(...values: string[]) {
    for (const line of values) {
      this._logValue.push(line);
    }

    this.print();
    return this._logValue.length - 1;
  }

  clear() {
    this._log.clear();
    //this._logValue = [];
  }

  appendLine(...values: string[]) {
    return this.append(...values.map((v) => "\n" + v));
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
    this.print();
    this._log.done();
    this._stdout += this.getLogValueString();
    this._logValue = [];
  }

  private getLogValueString() {
    return this._logValue.join("");
  }

  private print() {
    this._log(...this._logValue);
  }
}
