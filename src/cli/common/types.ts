import { Command } from "commander";

export type ParamsFrom = "args" | "options" | "both";

export interface ICommandOptions {
  flags: string;
  description?: string;
  defaultValue?: string;
}

export interface ICliCommandConstructor {
  name?: string;
  program: Command;
  paramsFrom?: ParamsFrom;
}

export interface ICliCommand {
  readonly paramsFrom?: ParamsFrom;
  /**
   * Gets **Commander** instance for the command.
   */
  readonly command: Command;
  handler(...args: any[]): Promise<void> | void;
  setAction(action: (...args: any[]) => Promise<void> | void): this;
}

export interface ICliCommandConstructable {
  new (command: Command): ICliCommand;
}
