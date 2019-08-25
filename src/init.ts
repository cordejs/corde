import fs from "fs";
import { clientlogin, pucketlogin } from "./bot";
import { logout } from "./bot";
import { Config } from "./config";
import { IConfigOptions } from "./config";
import MissingPropertyError from "./erros/missingPropertyError";

const config: IConfigOptions = loadConfig();

export function getConfig() {
  return config;
}

function loadConfig(): Config {
  try {
    let _config: IConfigOptions;
    const jsonfilePath = `${process.cwd()}/pucket.config.json`;

    if (fs.existsSync(jsonfilePath)) {
      _config = JSON.parse(fs.readFileSync(jsonfilePath).toString());
    } else {
      throw new Error("Configuration file not found");
    }

    if (_config) {
      return new Config(_config);
    } else {
      throw new Error("Invalid configuration file");
    }
  } catch {
    throw new Error("Configuration file not found");
  }
}

/**
 * Check if all required values are setted
 * TODO: JSON Schema
 */
function validadeConfigs(configs: Config) {
  if (!configs.pucketTestToken) {
    throw new MissingPropertyError("pucket token not informed");
  }
  else if (!configs.botTestId) {
    throw new MissingPropertyError("bot test id not informed");
 }
  else if (!configs.testFilesDir) {
    throw new MissingPropertyError("bot test id not informed");
 }
}

/**
 * Makes authentication to bots
 */
async function login() {
  try {
    // Make login with pucket and load Message
    await pucketlogin(config.pucketTestToken);
  } catch {
    throw new Error(
      `Error trying to connect to bot with token: ${config.pucketTestToken}`,
    );
  }

  if (config.botTestToken) {
    try {
      await clientlogin(config.botTestToken);
    } catch {
      throw new Error(
        `Error trying to connect to bot with token: ${config.botTestToken}`,
      );
    }
  }
}

/**
 * Starts the execution of tests
 */
export async function loadData() {
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
      return;
    }

    await login();
  }
}