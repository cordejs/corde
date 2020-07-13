import { TestReport } from "..";
import { CordeBot } from "../../interfaces";

/**
 * Base implementation of a command.
 * Contains all defaults values used in a *TestReport*
 */
export abstract class BaseCommand<Parameter> {
  /**
   * Defines values default values for tests.
   *
   * @param isNot Defines if the test is a deny
   * @param commandName Command that is testing
   */
  constructor(protected isNot: boolean, protected commandName: string) {}
  /**
   * Executor of tests. receives CordeBot implementation and test command parameter.
   *
   * @param cordeBot corde discord client implementation.
   * @param value value of **Parameter**
   * @returns TestReport. Object contract
   */
  public abstract async run(cordeBot: CordeBot, value: Parameter): Promise<TestReport>;
}
