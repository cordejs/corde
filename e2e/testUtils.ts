/* eslint-disable no-console */
import { Message } from "discord.js";
import fs from "fs";
import { removeANSIColorStyle } from "../tests/testHelper";
import * as childProcess from "child_process";
import { CliOutput } from "./types";
import path from "path";
import chalk from "chalk";

namespace testUtils {
  export function parseCommand(message: Message, prefix: string) {
    if (message.content.indexOf("") !== 0) return "";
    const args = message.content.slice(prefix.length).trim().split(" ");
    return args?.shift()?.toLowerCase();
  }

  export function buildCommandWithConfigPath(folderName: string, testFileName: string) {
    return `-f ./e2e/${folderName}/${testFileName}`;
  }

  export function saveOutput(filename: string, output: CliOutput) {
    let data = `File: ${filename}\n`;
    data += `exit code: ${output.exitCode}\n`;

    data += output.stdout;

    const SNAPSHOT_FOLDER = "./e2e/__snapshots__";

    if (!fs.existsSync(SNAPSHOT_FOLDER)) {
      fs.mkdirSync(SNAPSHOT_FOLDER);
    }

    const fullFilePath = `${SNAPSHOT_FOLDER}/${filename}`;
    const fileDirName = path.dirname(fullFilePath);

    if (!fs.existsSync(fileDirName)) {
      fs.mkdirSync(fileDirName);
    }

    fs.writeFileSync(fullFilePath.replace(".ts", ".txt"), data);
  }

  /**
   * @internal
   */
  export function runCLI(command: string, setConfig = true) {
    return new Promise<CliOutput>((resolve) => {
      const con = `node ./bin/corde ${
        setConfig ? "--config ./e2e/corde.config.ts" : ""
      } ${command}`;

      console.log(`${chalk.bgYellow.grey(" RUNNING ")}: ${con}`);

      const child = childProcess.exec(con, (error, stdout, stderr) => {
        if (error) {
          resolve({ stdout: removeANSIColorStyle(stderr), exitCode: child.exitCode });
        }

        if (stdout) {
          resolve({ stdout: removeANSIColorStyle(stdout), exitCode: child.exitCode });
        }

        if (stderr) {
          resolve({ stdout: removeANSIColorStyle(stderr), exitCode: child.exitCode });
        }
      });
    });
  }
}

export default testUtils;
