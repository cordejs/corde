import { Command } from "commander";
import * as commands from "../commands";
import { Constructor, IDisposable } from "../../types";
import { isIn } from "../../utils/isIn";
import { ICliCommand } from "./types";
import { object } from "../../utils/object";

export namespace commandFactory {
  const cache: ICliCommand[] = [];

  export function loadCommands(command: Command) {
    if (cache.length) {
      return cache;
    }

    object.foreach(commands, (commandType) => {
      const con = new commandType(command) as ICliCommand;
      cache.push(con);
      setAction(con);
    });

    return cache;
  }

  function setAction(con: ICliCommand) {
    con.setAction(async () => {
      if (con.paramsFrom === "args") {
        await con.handler(con.command.args);
      }

      if (con.paramsFrom === "options") {
        await con.handler(con.command.opts());
      }

      if (con.paramsFrom === "both") {
        await con.handler(con.command.opts(), ...con.command.args);
      }

      if (isDisposable(con)) {
        await con.dispose();
        return;
      }
    });
  }

  export function getCommand<T>(type: Constructor<T>) {
    return cache.find((c) => c instanceof type) as T | undefined;
  }

  function isDisposable(val: any): val is IDisposable {
    return isIn<IDisposable>(val, "dispose");
  }
}
