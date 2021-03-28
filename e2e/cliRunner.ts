import { _main } from "../lib/src/cli/cli";
import { mockProcess } from "../tests/mocks";
import { getFullConsoleLog, removeANSIColorStyle } from "../tests/testHelper";

/**
 * @internal
 */
export async function runCLI(command: string) {
  const mockProcessExit = mockProcess.mockProcessExit();
  const spyLog = jest.spyOn(console, "log");
  try {
    await _main(`node test --config ./e2e/corde.config.js ${command}`.split(" "));
  } finally {
    const fullLog = getFullConsoleLog(spyLog.mock.calls);
    const clearedLog = removeANSIColorStyle(fullLog);
    return [mockProcessExit, clearedLog];
  }
}
