import { LogContexts, LogLevels, createLogger } from "bs-logger";
import { backportTsJestDebugEnvVar } from "./backports";
import pkg from "../../../package";

const original = process.env.TS_JEST_LOG;

const buildOptions = () => ({
  context: {
    [LogContexts.package]: "ts-jest",
    [LogContexts.logLevel]: LogLevels.trace,
    version: pkg.version,
  },
  targets: process.env.TS_JEST_LOG || undefined,
});

export let rootLogger = createLogger(buildOptions());

backportTsJestDebugEnvVar(rootLogger);

if (original !== process.env.TS_JEST_LOG) {
  rootLogger = createLogger(buildOptions());
}
