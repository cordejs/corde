import * as Discord from "discord.js";
export declare const clientBot: Discord.Client;
export declare const concordBot: Discord.Client;
export declare function clientlogin(token: string): Promise<string>;
export declare function concordlogin(token: string): Promise<string>;
