/* eslint-disable no-console */

import chalk from "chalk";
import { buildReportMessage } from "../utils/buildReportMessage";
import { formatObject } from "../utils/formatObject";
import { LogUpdate } from "../utils/LogUpdate";
import { logger } from "./Logger";

/**
 * @internal
 */
export function printHookErrors(errors: Error[], log?: LogUpdate) {
  for (let i = 0; i < errors.length; i++) {
    // Errors thrown by hooks are always of type Error.

    if (errors[i].message) {
      print(chalk.red(buildReportMessage(errors[i].message)), log);
      print(chalk.red(buildReportMessage(errors[i].stack)), log);
    } else {
      const _formattedObject = formatObject(errors[i]);
      print(buildReportMessage(_formattedObject), log);
    }
  }
}

function print(message: string, log?: LogUpdate) {
  if (log) {
    log.append(message);
    return;
  }
  logger.log(message);
}
