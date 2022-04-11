import { Command } from "commander";
import * as commands from "../commands";
import { IDisposable } from "../../types";
import { forEachProp } from "../../utils/forEachProp";
import { isIn } from "../../utils/isIn";
import { ICliCommand } from "./types";
import { CliCommand } from "./CliCommand";

type Constructor<T> = new (...args: any[]) => T;

export namespace commandFactory {
  const cache: ICliCommand[] = [];

  export function loadCommands(command: Command) {
    if (cache.length) {
      return cache;
    }

    forEachProp(commands, (commandType) => {
      const con = new commandType(command) as CliCommand;
      cache.push(con);

      if (Array.isArray(con.paramsFrom)) {
        if (con.paramsFrom.includes("args") && con.paramsFrom.includes("options")) {
          con.setAction(async (args) => {
            const options = command.opts();
            await con.handler(options, args as any);

            if (isDisposable(con)) {
              await con.dispose();
            }
          });
        }
        return;
      }

      if (con.paramsFrom === "args") {
        con.setAction(async (args) => {
          await con.handler(args);

          if (isDisposable(con)) {
            await con.dispose();
          }
        });
        return;
      }

      con.setAction(async () => {
        const options = command.opts();
        await con.handler(options as any);

        if (isDisposable(con)) {
          await con.dispose();
        }
      });
    });

    return cache;
  }

  export function getCommand<T>(type: Constructor<T>) {
    return cache.find((c) => c instanceof type) as T | undefined;
  }

  function isDisposable(val: any): val is IDisposable {
    return isIn<IDisposable>(val, "dispose");
  }
}
