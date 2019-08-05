import * as Discord from "discord.js";
export interface IConfigOptions {
    readonly concordTestToken: string;
    readonly botTestId: string;
    readonly botTestToken: string;
    readonly channelId: string;
    readonly guildId: string;
    readonly timeOut?: number;
    readonly botPrefix: string;
    readonly testFilesDir: string;
    message: Discord.Message;
}
export declare class Config implements IConfigOptions {
    readonly concordTestToken: string;
    readonly botTestId: string;
    readonly botTestToken: string;
    readonly channelId: string;
    readonly guildId: string;
    readonly timeOut?: number;
    readonly botPrefix: string;
    readonly testFilesDir: string;
    message: Discord.Message;
    constructor(configs: IConfigOptions);
}
