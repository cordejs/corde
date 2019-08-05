import * as Discord from "discord.js";
export declare interface IConfig {
    concordTestToken: string;
    botTestId: string;
    botTestToken: string;
    channelId: string;
    guildId: string;
    timeOut?: number;
    botPrefix: string;
    testFilesDir: string;
    message: Discord.Message;
}
