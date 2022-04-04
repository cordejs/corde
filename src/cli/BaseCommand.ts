import { Command } from "commander";
import { ICommand } from "./types";

type ParamsFrom = "type" | "options";

interface CommandOptions {
  flags: string;
  description?: string;
  defaultValue?: string;
}

export abstract class BaseCommand<TArgs> implements ICommand {
  private _paramsFrom!: ParamsFrom;

  get paramsFrom() {
    return this._paramsFrom;
  }

  constructor(name: string, private _command: Command, paramsFrom: ParamsFrom) {
    this._paramsFrom = paramsFrom;
    this._command.name(name).action(this.action);
  }

  description(text: string) {
    this._command.description(text);
  }

  options(...commandOptions: CommandOptions[]) {
    for (const commandOption of commandOptions) {
      this._command.option(
        commandOption.flags,
        commandOption.description,
        commandOption.defaultValue,
      );
    }
  }

  alias(name: string) {
    this._command.alias(name);
  }

  abstract action(...args: TArgs[]): void | Promise<void>;
}
