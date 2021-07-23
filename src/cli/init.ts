/* eslint-disable no-console */
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { DEFAULT_CONFIG } from "../consts";
import { FileError } from "../errors";
import { ConfigFileType } from "../types";
import { keysOf, typeOf } from "../utils";

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
export function init(fileType: ConfigFileType = "json") {
  // No declaration of fileType is considered 'json'

  if (!fileType) {
    fileType = "json";
  }

  const fileContent = getFileFromType(fileType);

  if (!fileContent) {
    console.log(
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
    console.log(
      `- ${chalk.green("Successfully")} generated corde config in ${chalk.bold(filePath)}`,
    );
    console.log(fileContent);
  } catch (error) {
    throw new FileError(
      " - Fail in config file creation. Check if you have permission to create files in this directory.",
    );
  }
}

function getFileFromType(type: ConfigFileType) {
  if (type === "json") {
    return convertObjectToFileType(true);
  } else if (type === "js") {
    const temp = { ...DEFAULT_CONFIG };
    delete temp.project;
    return `module.exports = ${convertObjectToFileType(false)}`;
  } else if (type === "ts") {
    return `export = ${convertObjectToFileType(false)}`;
  }
  return undefined;
}

function convertObjectToFileType(isJson: boolean) {
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

    response += DOUBLE_SPACE + `${strType}${key}${strType}: ${value}${comma}\n`;
  }

  response += "}";
  return response;
}
