import { Command } from "commander";
import { ICliCommand, ICliCommandConstructor, ICommandOptions, ParamsFrom } from "./types";

export abstract class CliCommand implements ICliCommand {
  private _paramsFrom?: ParamsFrom;
  private _command: Command;

  get paramsFrom() {
    return this._paramsFrom;
  }

  get command() {
    return this._command;
  }

  constructor({ name, paramsFrom, program }: ICliCommandConstructor) {
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

  setArg(args: string) {
    this._command.argument(args);
  }

  setArgs(args: string) {
    this._command.arguments(args);
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
