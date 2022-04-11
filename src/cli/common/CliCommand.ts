import { Command } from "commander";
import { ICliCommand } from "./types";

type ParamsFrom = "args" | "options";

interface ICommandOptions {
  flags: string;
  description?: string;
  defaultValue?: string;
}

interface CliCommandConstructor {
  name?: string;
  program: Command;
  paramsFrom?: ParamsFrom | ParamsFrom[];
}

export abstract class CliCommand implements ICliCommand {
  private _paramsFrom?: ParamsFrom | ParamsFrom[];
  private _command: Command;

  get paramsFrom() {
    return this._paramsFrom;
  }

  constructor({ name, paramsFrom, program }: CliCommandConstructor) {
    this._paramsFrom = paramsFrom;

    if (name) {
      this._command = program.command(name);
    } else {
      this._command = program;
    }
  }

  description(text: string) {
    this._command.description(text);
    return this;
  }

  setArgs(args: string) {
    this._command.argument(args);
  }

  setAction(action: (...args: any[]) => Promise<void> | void) {
    this._command.action(action);
  }

  usage(str: string) {
    this._command.usage(str);
    return this;
  }

  options(...commandOptions: ICommandOptions[]) {
    for (const commandOption of commandOptions) {
      this._command.option(
        commandOption.flags,
        commandOption.description,
        commandOption.defaultValue,
      );
    }
    return this;
  }

  alias(name: string) {
    this._command.alias(name);
    return this;
  }

  abstract handler(...args: any[]): void | Promise<void>;
}
