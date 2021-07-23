import { Logger } from "tslog";
const log = new Logger();

/**
 * Prints data in `console.log` if env is `CORDE_DEBUG_MODE`
 * @param data data to be printed
 */
export function debug(...infos: any[]) {
  if (process.env.CORDE_DEBUG_MODE) {
    log.debug(...infos);
  }
}
