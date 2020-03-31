import { Assert } from '.';

/**
 * Receives wich command will be tested.
 *
 * @param commandName Command name.
 *
 * @description Do not inform the command prefix if
 * it's already informed in **configs**
 *
 * @returns The **Compare** object, where will handle
 * the type of response is expected.
 */
export function command(commandName: string): Assert {
  console.log('dasd');
  return new Assert(commandName, this.testName);
}
