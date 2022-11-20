let log: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Logger = require("tslog") as typeof import("tslog");
  log = new Logger.Logger();
} catch (error) {
  log = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    debug: (..._: any[]) => null,
  };
}

/**
 * Prints data in `console.log` if env is `CORDE_DEBUG_MODE`
 * @param infos data to be printed
 */
export function debug(...infos: any[]) {
  if (process.env.CORDE_DEBUG_MODE) {
    log.debug(...infos);
  }
}
