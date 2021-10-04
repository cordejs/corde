import { runtime } from "../core/runtime";
import { getStackTrace } from "../utils";

/**
 * Marks a suite as failed.
 * @since 5.0
 * @param message Custom message for the failed suite
 */
export function fail(message?: string) {
  runtime.internalEvents.emit("suite_forced_fail", {
    message: "Failed: " + message,
    pass: false,
    trace: getStackTrace(),
  });
}
