"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const initializer_1 = __importDefault(require("./initializer"));
exports.clientBot = new Discord.Client();
exports.concordBot = new Discord.Client();
exports.clientBot.on("ready", () => {
    console.log("Concord bot is ready for tests!");
});
exports.concordBot.on("message", (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.author.bot)
        return;
    if (!msg.content.startsWith(initializer_1.default.botPrefix, 0))
        return;
    initializer_1.default.message = msg;
}));
exports.concordBot.on("ready", () => __awaiter(this, void 0, void 0, function* () {
    let guild;
    let channel;
    try {
        if (!exports.concordBot.guilds) {
            throw new Error(`Concord bot isn't added in a guild. Please add it to the guild: ${initializer_1.default.guildId}`);
        }
        else if (!exports.concordBot.guilds.has(initializer_1.default.guildId)) {
            throw new Error(`Guild ${initializer_1.default.guildId} doesn't belong to concord bot. change the guild id in concord.config or add the bot to a valid guild`);
        }
        else {
            guild = exports.concordBot.guilds.get(initializer_1.default.guildId);
        }
        if (!guild.channels) {
            throw new Error(`${guild.name} doesn't have a channel with id ${initializer_1.default.channelId}.`);
        }
        else if (!guild.channels.has(initializer_1.default.channelId)) {
            throw new Error(`${initializer_1.default.channelId} doesn't appear to be a channel of guild ${guild.name}`);
        }
        else {
            channel = guild.channels.get(initializer_1.default.channelId);
        }
        if (!channel)
            return;
        if (!((channel) => channel.type === "text")(channel)) {
            return;
        }
        console.log("Client bot is ready for tests!");
        channel.send(`Starting tests`);
    }
    catch (error) {
        return Promise.reject(error);
    }
}));
function clientlogin(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.clientBot.login(token);
    });
}
exports.clientlogin = clientlogin;
function concordlogin(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.concordBot.login(token);
    });
}
exports.concordlogin = concordlogin;
//# sourceMappingURL=bot.js.map