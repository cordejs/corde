import fs from "fs";
import { clientlogin, trybotlogin } from "./bot";
import { Config } from "./config";
import { IConfigOptions } from "./config";
import MissingPropertyError from "./erros/missingPropertyError";
import { execFiles } from "./shell";

const config: IConfigOptions = loadConfig();

export function getConfig() {
  return config;
}

function loadConfig(): Config {
  try {
    let _config: IConfigOptions;
    const configFileName = "trybot.config.json";
    const jsonfilePath = `${process.cwd()}/${configFileName}`;

    if (fs.existsSync(jsonfilePath)) {
      _config = JSON.parse(fs.readFileSync(jsonfilePath).toString());
    } else {
      throw new Error(`Configuration file not found. Create a file called ${configFileName} in root of your application`);
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
  if (!configs.trybotTestToken) {
    throw new MissingPropertyError("trybot token not informed");
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
export async function login() {
  console.log("Connecting to bots...")
  try {
    // Make login with trybot and load Message
    await trybotlogin(config.trybotTestToken);
  } catch {
    throw new Error(
      `Error trying to connect to bot with token: ${config.trybotTestToken}`,
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