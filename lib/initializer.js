"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const missingPropertyError_1 = __importDefault(require("./erros/missingPropertyError"));
const bot_1 = require("./bot");
process.on("uncaughtException", function (error) {
    throw error;
    process.exit(1);
});
process.on("unhandledRejection", function (error) {
    throw error;
    process.exit(1);
});
let config = loadConfig();
exports.default = config;
function loadConfig() {
    try {
        let _config;
        const jsonfilePath = `${process.cwd()}/concord.config.json`;
        if (fs_1.default.existsSync(jsonfilePath)) {
            _config = JSON.parse(fs_1.default.readFileSync(jsonfilePath).toString());
        }
        else {
            throw new Error("Configuration file not found");
        }
        if (_config) {
            return new config_1.Config(_config);
        }
        else {
            throw new Error("Invalid configuration file");
        }
    }
    catch (_a) {
        throw new Error("Configuration file not found");
    }
}
function validadeConfigs(configs) {
    if (!configs.concordTestToken)
        throw new missingPropertyError_1.default("concord token not informed");
    else if (!configs.botTestId)
        throw new missingPropertyError_1.default("bot test id not informed");
    else if (!configs.testFilesDir)
        throw new missingPropertyError_1.default("bot test id not informed");
}
function begin() {
    return __awaiter(this, void 0, void 0, function* () {
        if (config) {
            validadeConfigs(config);
            try {
                yield bot_1.concordlogin(config.concordTestToken);
            }
            catch (_a) {
                throw new Error(`Error trying to connect to bot with token: ${config.concordTestToken}`);
            }
            if (config.botTestToken) {
                try {
                    yield bot_1.clientlogin(config.botTestToken);
                }
                catch (_b) {
                    throw new Error(`Error trying to connect to bot with token: ${config.botTestToken}`);
                }
            }
            let files;
            try {
                if (fs_1.default.existsSync(config.testFilesDir)) {
                    files = fs_1.default.readdirSync(config.testFilesDir);
                }
                else {
                    throw new Error(`Folder ${config.testFilesDir} does not exists`);
                }
            }
            catch (err) {
                console.error(err);
                return;
            }
            files.forEach(function (file) {
                require(`${process.cwd()}/${config.testFilesDir}/${file}`);
            });
        }
    });
}
exports.begin = begin;
begin();
//# sourceMappingURL=initializer.js.map