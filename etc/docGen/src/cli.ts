#!/usr/bin/env node

import { program } from 'commander';
import { mkdirSync, writeFileSync } from 'fs';
import { basename, dirname, isAbsolute, resolve } from 'path';
import {
  CompilerOptions,
  getParsedCommandLineOfConfigFile,
  sys,
} from 'typescript';
import { createDocumentation, Options } from '.';
import { heading, joinSections } from './markdown';
import { formatDiagnosticError } from './utils';

type CLIOptions = {
  project: string;
  entry: string;
  output: string;
};

program
  .name('typescript-documentation')
  .description(
    'Generate markdown API documentation directly from TypeScript source code'
  )
  .option(
    '-p, --project <tsconfig file>',
    'relative or absolute path to a tsconfig.json file',
    './tsconfig.json'
  )
  .option(
    '-e, --entry <main file>',
    'entry/main file of project',
    './src/index.ts'
  )
  .option(
    '-o, --output <markdown file>',
    'markdown documentation output file location',
    './docs/README.md'
  );

function getCompilerOptions(cliOptions: CLIOptions): CompilerOptions {
  const tsConfigPath = isAbsolute(cliOptions.project)
    ? cliOptions.project
    : resolve(process.cwd(), cliOptions.project);

  const config = getParsedCommandLineOfConfigFile(
    tsConfigPath,
    {},
    {
      ...sys,
      onUnRecoverableConfigFileDiagnostic: /* istanbul ignore next */ (
        diagnostic
      ) => {
        /* istanbul ignore next */
        throw new Error(formatDiagnosticError(diagnostic));
      },
    }
  );

  /* istanbul ignore next */
  if (!config) {
    throw new Error(`Unable to parse ${tsConfigPath}`);
  }
  return config.options;
}

function getOutput(cliOptions: CLIOptions): string {
  return isAbsolute(cliOptions.output)
    ? cliOptions.output
    : resolve(process.cwd(), cliOptions.output);
}

function getOptions(cliOptions: CLIOptions): Options {
  try {
    mkdirSync(dirname(getOutput(cliOptions)));
  } catch {
    /* istanbul ignore next */
    1;
  }

  return {
    compilerOptions: getCompilerOptions(cliOptions),
    entry: isAbsolute(cliOptions.entry)
      ? cliOptions.entry
      : resolve(process.cwd(), cliOptions.entry),
    getSectionLocation: (section: string): string =>
      section === 'default'
        ? basename(getOutput(cliOptions))
        : `${section.toLowerCase().replace(/ /g, '-')}.md`,
  };
}

program.parse(process.argv);
const cliOptions: CLIOptions = program.opts();
const options = getOptions(cliOptions);
try {
  createDocumentation(options).forEach((text: string, section: string) => {
    const content =
      section === 'default' ? text : joinSections([heading(section, 1), text]);

    /* istanbul ignore next */
    if (!content) {
      return;
    }

    writeFileSync(
      resolve(
        dirname(getOutput(cliOptions)),
        options.getSectionLocation(section)
      ),
      content,
      'utf8'
    );
  });
} catch (e) {
  /* istanbul ignore next */
  if (e instanceof Error) {
    console.log(e.stack);
  }
  /* istanbul ignore next */
  process.exit(1);
}
