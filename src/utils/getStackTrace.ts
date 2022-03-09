import { DEFAULT_STACK_TRACE_LIMIT, EXPECT_RECEIVED_TAB_SPACE } from "../const";

/**
 * Gets the trace of the current function / object
 * Spacing each line of the trace with `DEFAULT_STACK_TRACE_LIMIT`
 *
 * @example
 *
 * 20  function creator(fn) {
 * 21    fn();
 * 22    return getStackTrace();
 * 23  }
 * 24
 * 25  creator(() => {});
 *
 * // Being that the function is in file: D:\github\corde\test.js
 * // And current working dir: D:\github\corde\test.js
 *
 * // Outputs:
 *     creator (test.js:22:10)
 *     Object.<anonymous> (test.js:25:13)
 *
 * @param stackLimit Amount of lines to be collected.
 * @returns Formatted stack trace.
 *
 * @internal
 */
export function getStackTrace(
  stackLimit?: number | undefined | null,
  removeFirstStack = true,
  functionName?: string,
  additionalSpace?: string,
): string {
  const obj: any = {};

  let space = EXPECT_RECEIVED_TAB_SPACE;

  if (additionalSpace) {
    space += additionalSpace;
  }

  Error.prepareStackTrace = (_, calls) => {
    const stacksWithoutFirstCall = calls.slice(removeFirstStack ? 1 : 0);

    // There is no need of 100% stack trace,
    // so we remove irrelevant paths.

    const formatFunctionName = functionName ? `${functionName} ` : "";

    const trace =
      space +
      "at " +
      formatFunctionName +
      stacksWithoutFirstCall
        .filter((s) => isStraceRelevant(s))
        .slice(0, stackLimit ?? DEFAULT_STACK_TRACE_LIMIT)
        .join("\n" + space + "at ");

    // removes full path of the file for security.
    const formattedPath = process.cwd().replace(/\\/g, "\\\\");
    const regex = new RegExp(formattedPath + "\\\\", "g");
    return trace.replace(regex, "");
  };

  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
}

function isStraceRelevant(stack: NodeJS.CallSite) {
  const fileName = stack.getFileName();
  const functionName = stack.getFunctionName();
  return (
    !stack.isNative() &&
    !stack.isEval() &&
    (!functionName || !functionName.includes("Promise")) &&
    (!fileName ||
      (!fileName.startsWith("internal") &&
        !fileName.includes("\node_modules") &&
        !fileName.includes("node_modules")))
  );
}
