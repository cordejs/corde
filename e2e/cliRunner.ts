import { _main, program } from "../lib/src/cli/cli";
import { mockProcess } from "../tests/mocks";
import { getFullConsoleLog, removeANSIColorStyle } from "../tests/testHelper";

/**
 * @internal
 */
export async function runCLI(command: string, setConfig: boolean = true) {
  const mockProcessExit = mockProcess.mockProcessExit();
  const spyLog = jest.spyOn(console, "log");
  try {
    console.log(`node test ${setConfig ? `--config ./e2e/corde.config.ts` : ""} ${command}`);
    await _main(
      `node test ${setConfig ? `--config ./e2e/corde.config.ts` : ""} ${command}`.split(" "),
    );
  } catch (error) {
    console.log(error);
  } finally {
    const fullLog = getFullConsoleLog(spyLog.mock.calls);
    const clearedLog = removeANSIColorStyle(fullLog);
    return [mockProcessExit, clearedLog];
  }
}
