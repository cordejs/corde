import ConfigOptions, { configFileType } from '../models';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import chalk from 'chalk';
import { type } from 'os';

const jsonFile: ConfigOptions = {
  botPrefix: '',
  botTestId: '',
  channelId: '',
  cordeTestToken: '',
  files: [],
  guildId: '',
  testFilesDir: '',
  botTestToken: '',
  timeOut: 5000,
};

const jsFile = `
    module.exports = ${JSON.stringify(jsonFile)}
`;

const tsFile = `
    export const configs = ${JSON.stringify(jsonFile)}
`;

/**
 * Initialize a config file with all available options.
 * Formated using **prettier**
 *
 * @since 1.0
 *
 * @param fileType Possible type of file @see
 */
export default function init(fileType: configFileType = 'json') {
  let fileContent = '';

  // No declaration of fileType is consired 'json'

  if (!fileType) {
    fileType = 'json';
  }

  if (fileType === 'json') {
    fileContent = JSON.stringify(jsonFile);
  } else if (fileType === 'js') {
    fileContent = jsFile;
  } else if (fileType === 'ts') {
    fileContent = tsFile;
  } else {
    console.log(
      ` - ${chalk.bold(fileType)} is not a valid type. Use '${chalk.bold(
        'init --help',
      )}' to check valid types`,
    );
    process.exit(1);
  }

  try {
    const fileName = `corde.${fileType}`;
    const filePath = path.resolve(process.cwd(), fileName);
    fileContent = formatFile(fileContent, fileType);
    fs.writeFileSync(filePath, fileContent);
    console.log(
      `- ${chalk.green('Successfully')} generated corde config in ${chalk.bold(filePath)}`,
    );
    process.exit(0);
  } catch (error) {
    console.log(
      ' - Fail in config file creation. Check if you have permition to create files in this directory.',
    );
    console.log(error);
    process.exit(1);
  }
}

function formatFile(file: string, type: configFileType) {
  let fileParser: prettier.BuiltInParserName = 'babel';

  // Attempt to format a json with babel parse results in error
  if (type === 'json') {
    fileParser = 'json';
  }

  return prettier.format(file, {
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
    parser: fileParser,
  });
}
