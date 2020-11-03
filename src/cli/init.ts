import chalk from "chalk";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import ConfigOptions, { configFileType } from "../types";
import { FileError } from "../errors";

const jsonFile: ConfigOptions = {
  botPrefix: "",
  botTestId: "",
  channelId: "",
  cordeTestToken: "",
  guildId: "",
  testFiles: [""],
  botTestToken: "",
  timeOut: 5000,
};

const jsFile = `
    module.exports = ${JSON.stringify(jsonFile)}
`;

const tsFile = `
    module.exports = ${JSON.stringify(jsonFile)}
`;

/**
 * Initialize a config file with all available options.
 * Formated using **prettier**
 *
 * @version 1.0
 *
 * @param fileType Possible type of file
 *
 * @throws Error if could not create the config file
 */
export function init(fileType: configFileType = "json") {
  let fileContent = "";

  // No declaration of fileType is consired 'json'

  if (!fileType) {
    fileType = "json";
  }

  if (fileType === "json") {
    fileContent = JSON.stringify(jsonFile);
  } else if (fileType === "js") {
    fileContent = jsFile;
  } else if (fileType === "ts") {
    fileContent = tsFile;
  } else {
    console.log(
      ` - ${chalk.bold(fileType)} is not a valid type. Use '${chalk.bold(
        "init --help",
      )}' to check valid types`,
    );
  }

  try {
    const fileName = `corde.${fileType}`;
    const filePath = path.resolve(process.cwd(), fileName);
    fileContent = formatFile(fileContent, fileType);
    fs.writeFileSync(filePath, fileContent);
    console.log(
      `- ${chalk.green("Successfully")} generated corde config in ${chalk.bold(filePath)}`,
    );
  } catch (error) {
    throw new FileError(
      " - Fail in config file creation. Check if you have permission to create files in this directory.",
    );
  }
}

function formatFile(file: string, type: configFileType) {
  let fileParser: prettier.BuiltInParserName = "babel";

  // Attempt to format a json with babel parse results in error
  if (type === "json") {
    fileParser = "json";
  }

  return prettier.format(file, {
    printWidth: 100,
    singleQuote: true,
    trailingComma: "all",
    parser: fileParser,
  });
}
