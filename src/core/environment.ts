import { Logger, Runtime } from ".";

const logger = new Logger(process.stdout);
const runtime = new Runtime();

export { logger, runtime };
