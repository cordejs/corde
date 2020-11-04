import ConfigOptions from "../types";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { FileError, PropertyError } from "../errors";

/**
 * Check if configs are valid. Throws a exception
 * if there is no parameter or if any required property is
 * missing.
 *
 * @version 1.0
 *
 * @param configs Config parameter that will be validated
 *
 * @throws Error if any config is invalid.
 */
export function validate(configs: ConfigOptions) {
  if (!configs) {
    throw new FileError(chalk.red("● configs not informed."));
  }

  const errors: string[] = [];

  addToErrorsIfPropertyIsMissing(configs.botPrefix, errors, "bot prefix");
  addToErrorsIfPropertyIsMissing(configs.botTestId, errors, "bot test ID");
  addToErrorsIfPropertyIsMissing(configs.channelId, errors, "channel ID");
  addToErrorsIfPropertyIsMissing(configs.cordeTestToken, errors, "corde token");
  addToErrorsIfPropertyIsMissing(configs.guildId, errors, "guild ID");
  addToErrorsIfPropertyIsMissing(configs.botTestToken, errors, "bot test token");
  validatePaths(configs.testFiles, errors);

  let errorsString = "";

  if (errors.length === 1) {
    errorsString = chalk.red("\n● An required property is missing in config file:");
    buildMissingPropertiesErrorAndThrow(errorsString, errors);
  }

  if (errors.length > 1) {
    errorsString = chalk.red("\n● Some required properties are missing in config file:");
    buildMissingPropertiesErrorAndThrow(errorsString, errors);
  }
}

function validatePaths(pathsDir: string[], errors: string[]) {
  if (!pathsDir || pathsDir.length === 0) {
    errors.push("No test files informed");
    return;
  }

  for (const pathDir of pathsDir) {
    const pathResolved = path.resolve(process.cwd(), pathDir);
    if (fs.existsSync(pathResolved)) {
      const stats = fs.lstatSync(pathResolved);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(pathResolved);
        const filesResolve = [];
        for (const file of files) {
          filesResolve.push(path.resolve(pathResolved, file));
        }

        validatePaths(filesResolve, errors);
      }
    } else {
      errors.push(`path: ${pathDir} does not exists`);
    }
  }
}

function addToErrorsIfPropertyIsMissing(value: string, errors: string[], message: string) {
  if (!isStringValid(value)) {
    errors.push(message);
  }
}

function isStringValid(value: string) {
  return value && value.trim() !== "";
}

function buildMissingPropertiesErrorAndThrow(errorString: string, erros: string[]) {
  erros.forEach((error) => (errorString += `\n${chalk.red(`- ${error}`)}`));
  throw new PropertyError(errorString);
}
