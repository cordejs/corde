import { Command } from "commander";
import { IDisposable } from "../types";
import { BaseCommand } from "./BaseCommand";

export class ExecCommand extends BaseCommand<corde.Config.ICLIOptions> implements IDisposable {
  constructor(command: Command) {
    super("exec", command, "options");

    this.options(
      {
        flags: "-c, --config <type>",
        description: "Set config file path",
      },
      {
        flags: "-p, --project <type>",
        description: "Set tsconfig path",
      },
      {
        flags: "-f, --files <path>",
        description:
          "Set the path for all tests. Use this if you wan to specify a single path." +
          " for Array, use only 'corde <path1> <path2>'",
      },
    );
  }

  dispose(): void | Promise<void> {
    throw new Error("Method not implemented.");
  }

  action(): void | Promise<void> {
    throw new Error("Method not implemented.");
  }
}
