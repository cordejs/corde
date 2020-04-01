import readLine from 'readline';

/**
 * Creates a string line loadding.
 */
export class Loader {
  /**
   * Loading values.
   */
  private loadingValues: string[];
  /**
   * Actual element of **values** that will be printed
   */
  private index = 0;
  /**
   * Will be printed before the load string.
   */
  private lineMessage: string;
  /**
   * Identifier of *setInterval* for close purpose
   */
  private timer: NodeJS.Timeout;
  /**
   * Defined in constructor. Is the update frequence of the load.
   */
  private updateFrequence: number;

  /**
   * Defines wich message will be accomplished with the load
   * @param lineMessage Message that will be printed before the load string
   * @param updateFrequence Time that the string load will be changed.
   * @param loadingValues Values for line display
   */
  constructor(
    lineMessage: string,
    updateFrequence: number = 150,
    loadingValues: string[] = ['|', '/', '-', '\\'],
  ) {
    this.lineMessage = lineMessage;
    this.updateFrequence = updateFrequence;
    this.loadingValues = loadingValues;
  }

  /**
   * Starts printing load icon.
   */
  start() {
    this.timer = setInterval(() => {
      this.index = this.index > 3 ? 0 : this.index;
      readLine.clearLine(process.stdout, 0);
      readLine.cursorTo(process.stdout, 0);
      process.stdout.write(this.lineMessage + '' + this.loadingValues[this.index]);
      this.index++;
    }, this.updateFrequence);
  }

  /**
   * Stop printing load.
   */
  stop() {
    clearInterval(this.timer);
    process.stdout.write('\n');
  }
}
