import { IConfig } from "./interfaces/Iconfig"
import * as Discord from "discord.js"

export declare let configs: IConfig

/**
 * Fake user
 */
export let concord = new Discord.Client()

/**
 * User's bot client
 */
export let bot = new Discord.Client()

export let message: Discord.Message

export function setMessage(message: Discord.Message) {
    message = message
}

export function setConfig(config: IConfig) {
    configs = config
}
