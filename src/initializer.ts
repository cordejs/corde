import fs from "fs";
import { Config } from "./config";
import MissingPropertyError from "./erros/missingPropertyError";
import { concordlogin, clientlogin } from "./bot";
import { IConfigOptions } from "./config";

let config: IConfigOptions = loadConfig();
export default config;

function loadConfig(): Config {
  try {
    let _config: IConfigOptions;
    const jsonfilePath = `${process.cwd()}/concord.config.json`;

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
  if (!configs.concordTestToken)
    throw new MissingPropertyError("concord token not informed");
  else if (!configs.botTestId)
    throw new MissingPropertyError("bot test id not informed");
  else if (!configs.testFilesDir)
    throw new MissingPropertyError("bot test id not informed");
}

/**
 * Starts the execution of tests
 */
export async function begin() { 
  if (config) {

    validadeConfigs(config);

    try {
      // Make login with concord and load Message
      await concordlogin(config.concordTestToken);
    } catch {
      throw new Error(`Error trying to connect to bot with token: ${config.concordTestToken}`);
    }

    if (config.botTestToken) {   
      try {
        await clientlogin(config.botTestToken);
      } catch {
        throw new Error(`Error trying to connect to bot with token: ${config.botTestToken}`);
      } 
    }

    let files: string[];

    try {
      files = fs.readdirSync(config.testFilesDir);
    } catch (err) {
      console.error(err)
      return
    }

    files.forEach(function(file) {
       // Execute all test cases 
       require(`${process.cwd()}/${config.testFilesDir}/${file}`)
    })
  }
}

begin()
