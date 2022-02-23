import { dateDiff } from "./dateDiff";

/**
 * @internal
 */
export class Timer {
  private _startTime!: Date;
  private _endTime!: Date;

  start() {
    this._startTime = new Date();
  }

  stop() {
    this._endTime = new Date();
    return dateDiff(this._endTime, this._startTime);
  }
}
