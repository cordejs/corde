import { program } from "commander";
import {
  ExecCommand,
  InitCommand,
  ShowConfigCommand,
  ValidateCommand,
} from "../../../src/cli/commands";
import { commandFactory } from "../../../src/cli/common";

const commandsTypes = [ValidateCommand, InitCommand, ShowConfigCommand, ExecCommand];
describe("testing commandFactory", () => {
  it.each(commandsTypes)("should load command %s", (type) => {
    const commands = commandFactory.loadCommands(program);
    expect(commands.some((c) => c instanceof type));
  });

  it.each(commandsTypes)("should get command %s", (type) => {
    commandFactory.loadCommands(program);
    expect(commandFactory.getCommand(type as any)).toBeTruthy();
  });
});
