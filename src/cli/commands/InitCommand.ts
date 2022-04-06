import { ConfigFileType, IDisposable } from "../../types";
import { CliCommand } from "../common/CliCommand";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { DEFAULT_CONFIG } from "../../const";
import { logger } from "../../core/Logger";
import { FileError } from "../../errors";
import { keysOf } from "../../utils/keysOf";
import { typeOf } from "../../utils/typeOf";
import { exit } from "process";
import { Command } from "commander";

/**
 * Initialize a config file with all available options.
 * Formatted using **prettier**
 *
 * @version 1.0
 *
 * @param fileType Possible type of file
 *
 * @throws Error if could not create the config file
 */
export class InitCommand extends CliCommand<ConfigFileType> implements IDisposable {
  constructor(program: Command) {
    super({
      program,
      name: "init [type]",
      paramsFrom: "type",
    });

    this.alias("i")
      .description("Initialize a config file with all possible options")
      .usage("[js ts json] or empty for default type (json)");
  }

  handler(fileType: ConfigFileType = "json") {
    // No declaration of fileType is considered 'json'

    if (!fileType) {
      fileType = "json";
    }

    const fileContent = this.getFileFromType(fileType);

    if (!fileContent) {
      logger.log(
        ` - ${chalk.bold(fileType)} is not a valid type. Use '${chalk.bold(
          "init --help",
        )}' to check valid types`,
      );
      return;
    }

    try {
      const fileName = `corde.config.${fileType}`;
      const filePath = path.resolve(process.cwd(), fileName);
      fs.writeFileSync(filePath, fileContent);
      logger.log(
        `- ${chalk.green("Successfully")} generated corde config in ${chalk.bold(filePath)}`,
      );
      logger.log(fileContent);
    } catch (error) {
      throw new FileError(
        " - Fail in config file creation. Check if you have permission to create files in this directory.",
      );
    }
  }

  dispose(): void | Promise<void> {
    exit(0);
  }

  private getFileFromType(type: ConfigFileType) {
    if (type === "json") {
      return this.convertObjectToFileType(true);
    } else if (type === "js") {
      return `module.exports = ${this.convertObjectToFileType(false)}`;
    } else if (type === "ts") {
      return `export = ${this.convertObjectToFileType(false)}`;
    }
    return undefined;
  }

  private convertObjectToFileType(isJson: boolean) {
    // eslint-disable-next-line quotes
    const strType = isJson ? '"' : "";
    const DOUBLE_SPACE = "  ";
    let response = isJson
      ? `{\n${DOUBLE_SPACE}"$schema": "./node_modules/corde/schema/corde.schema.json",\n`
      : "{\n";

    const keys = keysOf(DEFAULT_CONFIG);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let value = (DEFAULT_CONFIG as any)[key];

      if (typeOf(value) === "string") {
        // eslint-disable-next-line quotes
        value = '""';
      }

      if (Array.isArray(value)) {
        let newValue = "[";
        for (let i = 0; i < value.length; i++) {
          if (typeOf(value[i]) === "string") {
            newValue += `"${value[i]}"`;
          } else {
            newValue += `${value[i]}`;
          }

          if (i != value.length - 1) {
            newValue += ", ";
          }
        }

        value = newValue + "]";
      }

      const comma = i === keys.length - 1 ? "" : ",";

      response += DOUBLE_SPACE + `${strType}${String(key)}${strType}: ${value}${comma}\n`;
    }

    response += "}";
    return response;
  }
}
