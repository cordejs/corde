import { Command } from "commander";
import { ICliCommand, ICliCommandConstructor, ICommandOptions, ParamsFrom } from "./types";

export abstract class CliCommand implements ICliCommand {
  private _paramsFrom?: ParamsFrom;
  private _command: Command;

  get paramsFrom() {
    return this._paramsFrom;
  }

  get command() {
    return this._command;
  }

  constructor({ name, paramsFrom, program }: ICliCommandConstructor) {
    this._paramsFrom = paramsFrom;

    if (name) {
      this._command = program.command(name);
    } else {
      this._command = program;
    }
  }

  /**
   * Set the description.
   *
   * @returns `this` command for chaining
   */
  setDescription(text: string) {
    this._command.description(text);
    return this;
  }

  /**
   * Define argument syntax for command.
   *
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @example
   * ```
   * this.setArg('<input-file>');
   * this.setArg('[output-file]');
   * ```
   *
   * @returns `this` command for chaining
   */
  setArg(name: string, description?: string | undefined, defaultValue?: unknown) {
    this._command.argument(name, description, defaultValue);
    return this;
  }

  /**
   * Define argument syntax for command, adding multiple at once (without descriptions).
   *
   * See also .argument().
   *
   * @example
   * ```
   * this.setArgs('<cmd> [env]');
   * ```
   *
   * @returns `this` command for chaining
   */
  setArgs(args: string) {
    this._command.arguments(args);
    return this;
  }

  /**
   * Register callback `fn` for the command.
   *
   * @example
   * ```
   * this
   *   .setDescription('start service')
   *   .action(function() {
   *     // do work here
   *   });
   * ```
   *
   * @returns `this` command for chaining
   */
  setAction(action: (...args: any[]) => Promise<void> | void) {
    this._command.action(action);
    return this;
  }

  /**
   * Set the command usage.
   *
   * @returns `this` command for chaining
   */
  setUsage(str: string) {
    this._command.usage(str);
    return this;
  }

  /**
   * Define a collection of options.
   * Check `setOption` function for details
   *
   * @see
   *
   * @param commandOptions
   * @returns
   */
  setOptions(...commandOptions: ICommandOptions[]) {
    for (const commandOption of commandOptions) {
      this._command.option(
        commandOption.flags,
        commandOption.description,
        commandOption.defaultValue,
      );
    }
    return this;
  }

  /**
   * Define a option with `flags`, `description` and optional
   * coercion `fn`.
   *
   * The `flags` string contains the short and/or long flags,
   * separated by comma, a pipe or space. The following are all valid
   * all will output this way when `--help` is used.
   *
   *     "-p, --pepper"
   *     "-p|--pepper"
   *     "-p --pepper"
   *
   * @example
   * ```
   * // simple boolean defaulting to false
   *  this.setOption('-p, --pepper', 'add pepper');
   *
   *  --pepper
   *  this.pepper
   *  // => Boolean
   *
   *  // simple boolean defaulting to true
   *  this.setOption('-C, --no-cheese', 'remove cheese');
   *
   *  this.cheese
   *  // => true
   *
   *  --no-cheese
   *  this.cheese
   *  // => false
   *
   *  // required argument
   *  this.setOption('-C, --chdir <path>', 'change the working directory');
   *
   *  --chdir /tmp
   *  program.chdir
   *  // => "/tmp"
   *
   *  // optional argument
   *  this.setOption('-c, --cheese [type]', 'add cheese [marble]');
   * ```
   *
   * @returns `this` command for chaining
   */
  setOption(commandOptions: ICommandOptions) {
    this.setOptions(commandOptions);
    return this;
  }

  /**
   * Set an alias for the command.
   *
   * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
   *
   * @returns `this` command for chaining
   */
  setAlias(name: string) {
    this._command.alias(name);
    return this;
  }

  abstract handler(...args: any[]): void | Promise<void>;
}
