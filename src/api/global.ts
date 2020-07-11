import { MatchesWithNot } from ".";
import { command as _command } from "./command";

declare global {
  interface Global {
    command(commandName: string): MatchesWithNot;
  }
}

declare var command: typeof _command;

const _global = global as any;
_global.command = command;
