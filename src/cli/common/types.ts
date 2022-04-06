import { Command } from "commander";

export type ParamsFrom = "type" | "options";
export interface ICliCommand {
  readonly paramsFrom?: ParamsFrom;
  handler(...args: any[]): Promise<void> | void;
}

export interface ICliCommandConstructable {
  new (command: Command): ICliCommand;
}
