import { Logger, Runtime, TestCollector } from ".";

const logger = new Logger(process.stdout);
const runtime = new Runtime();
const testCollector = TestCollector.getInstance();

export { logger, runtime, testCollector };
