import inspector from "inspector";

/**
 * Check if corde is being run in debug
 * @internal
 */
export function isInDebugMode() {
  return inspector.url() !== undefined;
}
