import fs from "fs"
import { IConfig } from "./interfaces/Iconfig"
import { configs, setConfig, concord, bot } from "./global"
import MissingPropertyError from "./erros/missingPropertyError"

function getConfig(): IConfig {
  try {
    let _configs: IConfig
    const jsonfilePath = `${process.cwd()}/concord.config.json`

    if (fs.existsSync(jsonfilePath)) {
      _configs = JSON.parse(fs.readFileSync(jsonfilePath).toString())
    } else {
      throw new Error("Configuration file not found")
    }

    if (_configs) {
      return _configs
    } else {
      throw new Error("Invalid configuration file")
    }
  } catch {
    throw new Error("Configuration file not found")
  }
}

/**
 * Check if all required values are setted
 * TODO: JSON Schema
 */
function validadeConfigs(configs: IConfig) {
  if (!configs.concordTestToken)
    throw new MissingPropertyError("concord token not informed")
  else if (!configs.botTestId)
    throw new MissingPropertyError("bot test id not informed")
  else if (!configs.testFilesDir)
    throw new MissingPropertyError("bot test id not informed")
}

/**
 * Starts the execution of tests
 */
export default async function begin() {

  const config = getConfig()
  
  if (config) {

    setConfig(config)
    validadeConfigs(config)

    try {
      await concord.login(configs.concordTestToken)
    } catch {
      throw new Error(`Error trying to connect to bot with token: ${configs.concordTestToken}`)
      return
    }

    if (configs.botTestToken) {   
      try {
        await bot.login(configs.botTestToken)
      } catch {
        throw new Error(`Error trying to connect to bot with token: ${configs.botTestToken}`)
        return
      } 
    }

    let files: string[]

    try {
      files = fs.readdirSync(configs.testFilesDir)
    } catch (err) {
      console.error(err)
      return
    }

    files.forEach(function(file) {
       require(`${process.cwd()}/${config.testFilesDir}/${file}`)
    })

  }
}

begin()
