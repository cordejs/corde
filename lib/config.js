"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(configs) {
        this.botPrefix = configs.botPrefix;
        this.botTestId = configs.botTestId;
        this.botTestToken = configs.botTestToken;
        this.channelId = configs.channelId;
        this.concordTestToken = configs.concordTestToken;
        this.guildId = configs.guildId;
        this.testFilesDir = configs.testFilesDir;
        this.timeOut = configs.timeOut;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map