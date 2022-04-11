import { Command } from "commander";

export type ParamsFrom = "args" | "options";
export interface ICliCommand {
  readonly paramsFrom?: ParamsFrom | ParamsFrom[];
  handler(...args: any[]): Promise<void> | void;
}

export interface ICliCommandConstructable {
  new (command: Command): ICliCommand;
}
