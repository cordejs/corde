import chalk from 'chalk';
import ConfigOptions from '../models';

/**
 * Check if configs are valid. If not, print witch properties
 * are not valid and returns false. If all configs are valid.
 * Returns true.
 *
 * @since 1.0
 *
 * @param configs Config paramater that will be validated
 *
 */
export function validate(configs: ConfigOptions) {
  if (!configs) {
    console.log(chalk.red('● configs not informed.'));
    return false;
  }

  const errors: string[] = [];

  addToErrorsIfPropertyIsMissing(configs.botPrefix, errors, 'bot prefix');
  addToErrorsIfPropertyIsMissing(configs.botTestId, errors, 'bot test ID');
  addToErrorsIfPropertyIsMissing(configs.channelId, errors, 'channel ID');
  addToErrorsIfPropertyIsMissing(configs.cordeTestToken, errors, 'corde token');
  addToErrorsIfPropertyIsMissing(configs.guildId, errors, 'guild ID');
  addToErrorsIfPropertyIsMissing(configs.botTestToken, errors, 'bot test token');
  addToErrorsIfPropertyIsMissing(configs.testFilesDir, errors, 'test files DIR');

  let errorsString = '';

  if (errors.length === 1) {
    errorsString = chalk.red('\n● An required property is missing in config file:');
    buildMissingPropertiesErrorAndThrow(errorsString, errors);
    return false;
  }

  if (errors.length > 1) {
    errorsString = chalk.red('\n● Some required properties are missing in config file:');
    buildMissingPropertiesErrorAndThrow(errorsString, errors);
    return false;
  }
  return true;
}

function addToErrorsIfPropertyIsMissing(value: string, errors: string[], message: string) {
  if (!isStringValid(value)) {
    errors.push(message);
  }
}

function isStringValid(value: string) {
  return value && value.trim() !== '';
}

function buildMissingPropertiesErrorAndThrow(errorString: string, erros: string[]) {
  erros.forEach((error) => (errorString += `\n${chalk.red(`- ${error}`)}`));
  console.log(errorString);
}
