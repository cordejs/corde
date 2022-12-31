import { dateDiff } from "./dateDiff";

/**
 * @internal
 * Provides a set of methods and properties that you can use to accurately measure
 * elapsed time.
 */
export class Stopwatch {
  private _startTime?: Date;
  private _endTime?: Date;
  private _isRunning = false;

  /**
   * Initializes a new instance of the Timer class.
   */
  constructor() {}

  /**
   * Gets the total elapsed time measured by the current instance, in milliseconds.
   *
   * @returns
   *  A integer representing the total number of milliseconds measured
   *  by the current instance.
   */
  get elapsedInMilliseconds() {
    return this.getElapsed()[1];
  }

  /**
   * Gets the total elapsed time measured by the current instance, formatted. I.E (1.32ms)
   *
   * @returns
   *  A string representing the total amount of time measured
   *  by the current instance formatted by the an time scale definition.
   */
  get elapsedFormatted() {
    return this.getElapsed()[0];
  }

  /**
   *  Gets a value indicating whether the **Stopwatch** timer is running.
   *
   * @returns
   * true if the System.Diagnostics.Stopwatch instance is currently running and measuring
   * elapsed time for an interval; otherwise, false.
   */
  get isRunning() {
    return this._isRunning;
  }

  /**
   * Starts, or resumes, measuring elapsed time for an interval.
   */
  start() {
    if (!this._isRunning) {
      this._isRunning = true;
      this._startTime = new Date();
    }
  }

  /**
   * Stops measuring elapsed time for an interval.
   * @returns The interval between the beginning and the end of the time measuring.
   * Two values are returned, a value with value type formatting i.e: "1.32ms", and the value in milliseconds i.e (1320)
   */
  stop(): [string, number] {
    if (!this._startTime) {
      return ["0ms", 0];
    }

    this._endTime = new Date();
    this._isRunning = false;
    return dateDiff(this._endTime, this._startTime);
  }

  /**
   * Stops time interval measurement and resets the elapsed time to zero.
   */
  reset() {
    this._startTime = undefined;
    this._endTime = undefined;
  }

  /**
   * Stops time interval measurement, resets the elapsed time to zero, and starts
   * measuring elapsed time.
   */
  restart() {
    this._startTime = new Date();
    this._endTime = undefined;
  }

  /**
   * Initializes a new Timer instance, sets the elapsed time
   * property to zero, and starts measuring elapsed time.
   *
   * @returns
   * A Timer that has just begun measuring elapsed time.
   */
  startNew() {
    const newInstance = new Stopwatch();
    newInstance.start();
    return newInstance;
  }

  private getElapsed() {
    if (this._endTime && this._startTime) {
      return dateDiff(this._endTime, this._startTime);
    }

    if (!this._endTime && this._startTime) {
      return dateDiff(new Date(), this._startTime);
    }

    return ["0ms", 0];
  }
}
