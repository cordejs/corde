import fs from "fs";
import ConfigFileNotFoundError from "./erros/configFileNotFoundErro";
import { IConfig } from "./interfaces/Iconfig";
import { configs, setConfig, concord, bot } from "./global";
import MissingPropertyError from "./erros/missingPropertyError";

const __baseTestDir = "../../tests";

function getConfig(): IConfig {
  try {
    let _configs: IConfig;

    if (process.env.TYPE && process.env.TYPE === "dev") {
      if (fs.existsSync(`${__baseTestDir}/concord.json`)) {
        _configs = JSON.parse(
          fs.readFileSync(`${__baseTestDir}/concord.json`, "utf8")
        );
      }
    } else {
      // I don't know how to get config file from a globally installed package
    }

    console.log(_configs);

    if (_configs && _configs.botTestId && _configs.botTestId) {
      return _configs;
    }
  } catch {
    throw new ConfigFileNotFoundError();
  }
}

/**
 * Check if all required values are setted
 * TODO: JSON Schema
 */
function validadeConfigs(configs: IConfig) {
  if (!configs.concordTestToken)
    throw new MissingPropertyError("concord token not informed");
  else if (!configs.botTestId)
    throw new MissingPropertyError("bot test id not informed");
  else if (!configs.testDir)
    throw new MissingPropertyError("bot test id not informed");
}

/**
 * Starts the execution of tests
 */
export function runTests() {
  const config = getConfig();
  if (config) {
    setConfig(config);
    validadeConfigs(config);

    concord.login(configs.concordTestToken);

    if (configs.botTestToken) {
      bot.login(configs.botTestToken);
    }

    let files: string[];

    try {
      files = fs.readdirSync(configs.testDir);
    } catch (err) {
      console.error(err);
      return;
    }

    files.forEach(function(file) {
      console.log(file);
    });
  }
}

runTests()