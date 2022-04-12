import { CliCommand } from "../common/CliCommand";
import chalk from "chalk";
import { FileError, PropertyError } from "../../errors";
import { getFiles } from "../../utils/getFiles";
import { stringIsNullOrEmpty } from "../../utils/stringIsNullOrEmpty";
import { Command } from "commander";

/**
 * Check if configs are valid. Throws an exception
 * if there is no parameter or if any required property is
 * missing.
 *
 * @version 1.0
 *
 * @param configs Config parameter that will be validated
 *
 * @throws Error if any config is invalid.
 */
export class Validate extends CliCommand {
  constructor(program: Command) {
    super({
      program,
      name: "validate",
    });

    this.setAlias("v");
    this.setDescription("Search for corde configs and check if all data are valid");
  }

  async handler(configs: corde.IConfigOptions) {
    if (!configs) {
      throw new FileError(chalk.red("● configs not informed."));
    }

    const errors: string[] = [];

    this.addToErrorsIfPropertyIsMissing(configs.botPrefix, errors, "bot prefix");
    this.addToErrorsIfPropertyIsMissing(configs.botTestId, errors, "bot test ID");
    this.addToErrorsIfPropertyIsMissing(configs.channelId, errors, "channel ID");
    this.addToErrorsIfPropertyIsMissing(configs.cordeBotToken, errors, "corde token");
    this.addToErrorsIfPropertyIsMissing(configs.guildId, errors, "guild ID");
    await this.validatePaths(configs.testMatches, errors);

    let errorsString = "";

    if (errors.length > 0) {
      errorsString = chalk.red("\n● Corde validation report:\n  ");

      if (errors.length === 1) {
        errorsString += chalk.red("an required property is missing in config file:\n");
        this.buildMissingPropertiesErrorAndThrow(errorsString, errors);
      }

      if (errors.length > 1) {
        errorsString += chalk.red("some required properties are missing in config file\n");
        this.buildMissingPropertiesErrorAndThrow(errorsString, errors);
      }
    }
  }

  async validatePaths(pathsDir: string[] | undefined, errors: string[]) {
    pathsDir = pathsDir?.filter((p) => p);

    if (!pathsDir || pathsDir.length === 0) {
      errors.push("No test files informed." + chalk.cyan("(testMatches)"));
      return;
    }

    for (const pathDir of pathsDir) {
      const files = await getFiles(pathDir);

      if (files.length === 0) {
        errors.push(`path: ${pathDir} does not exists`);
      }
    }
  }

  addToErrorsIfPropertyIsMissing(value: string | undefined, errors: string[], message: string) {
    if (stringIsNullOrEmpty(value)) {
      errors.push(message);
    }
  }

  buildMissingPropertiesErrorAndThrow(errorString: string, errors: string[]) {
    errors.forEach((error) => (errorString += `\n    ${chalk.red(`- ${error}`)}`));
    errorString += "\n";
    throw new PropertyError(errorString);
  }
}
