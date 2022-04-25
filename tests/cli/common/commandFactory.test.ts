import { program } from "commander";
import { Exec, Init, ShowConfig, Validate } from "../../../src/cli/commands";
import { commandFactory } from "../../../src/cli/common";

const commandsTypes = [Exec, Init, ShowConfig, Validate];

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
