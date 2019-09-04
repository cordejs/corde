import fs from "fs";
import { clientlogin, cordelogin } from "./bot";
import { Config } from "./config";
import { IConfigOptions } from "./config";
import ConfigFileNotFoundError from "./erros/configFileNotFoundErro";
import MissingPropertyError from "./erros/missingPropertyError";
import { execFiles } from "./shell";

/**
 * Contains informations loaded from configuration file
 */
const config: IConfigOptions = loadConfig();

/**
 * External function for **config** access
 */
export function getConfig() {
  return config;
}

/**
 * Read config file(*.json) from root of project
 * and validates it
 * @throws
 */
function loadConfig(): Config {
  let _config: IConfigOptions;
  const configFileName = "corde.config.json";
  const jsonfilePath = `${process.cwd()}/${configFileName}`;

  if (fs.existsSync(jsonfilePath)) {
    _config = JSON.parse(fs.readFileSync(jsonfilePath).toString());
  } else {
    throw new ConfigFileNotFoundError();
  }

  if (_config) {
    return new Config(_config);
  } else {
    throw new Error("Invalid configuration file");
  }
}

/**
 * Check if all required values are setted
 * TODO: JSON Schema
 */
function validadeConfigs(configs: Config) {
  if (!configs.cordeTestToken) {
    throw new MissingPropertyError("corde token not informed");
  } else if (!configs.botTestId) {
    throw new MissingPropertyError("bot test id not informed");
  } else if (!configs.testFilesDir) {
    throw new MissingPropertyError("bot test id not informed");
  }
}

/**
 * Makes authentication to bots
 */
export async function login() {
  console.log("Connecting to bots...");
  try {
    // Make login with corde and load Message
    await cordelogin(config.cordeTestToken);
  } catch {
    throw new Error(
      `Error trying to connect to bot with token: ${config.cordeTestToken}`
    );
  }

  if (config.botTestToken) {
    try {
      await clientlogin(config.botTestToken);
    } catch {
      throw new Error(
        `can not connect to bot with token: ${config.botTestToken}`
      );
    }
  }
}

/**
 * Find all tests files and run then in node
 */
export async function execTestFiles() {
  if (config) {
    config.files = fs.readdirSync(config.testFilesDir);
    await loadTestFiles();
    await execFiles(config.files);
  }
}
/**
 * Load tests files into configs
 */
export async function loadTestFiles() {
  if (config) {
    validadeConfigs(config);
    // Get all tests files
    try {
      if (fs.existsSync(config.testFilesDir)) {
        config.files = fs.readdirSync(config.testFilesDir);
      } else {
        throw new Error(`Path ${config.testFilesDir} does not exists}`);
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
    config.executeInBotLogin = true;
  }
}
