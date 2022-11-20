import { dateDiff } from "./dateDiff";

/**
 * @internal
 */
export class Timer {
  private _startTime!: Date;
  private _endTime!: Date;
  private _isRunning = false;

  start() {
    if (!this._isRunning) {
      this._isRunning = true;
      this._startTime = new Date();
    }
  }

  stop() {
    this._endTime = new Date();
    this._isRunning = false;
    return dateDiff(this._endTime, this._startTime);
  }
}
