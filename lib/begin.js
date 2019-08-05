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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const missingPropertyError_1 = __importDefault(require("./erros/missingPropertyError"));
const bot_1 = require("./bot");
const config_1 = __importStar(require("./config"));
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
            config_1.setConfig(_config);
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
        loadConfig();
        if (config_1.default) {
            validadeConfigs(config_1.default);
            try {
                yield bot_1.concordlogin(config_1.default.concordTestToken);
            }
            catch (_a) {
                throw new Error(`Error trying to connect to bot with token: ${config_1.default.concordTestToken}`);
            }
            if (config_1.default.botTestToken) {
                try {
                    yield bot_1.clientlogin(config_1.default.botTestToken);
                }
                catch (_b) {
                    throw new Error(`Error trying to connect to bot with token: ${config_1.default.botTestToken}`);
                }
            }
            let files;
            try {
                files = fs_1.default.readdirSync(config_1.default.testFilesDir);
            }
            catch (err) {
                console.error(err);
                return;
            }
            files.forEach(function (file) {
                require(`${process.cwd()}/${config_1.default.testFilesDir}/${file}`);
            });
        }
    });
}
exports.default = begin;
begin();
//# sourceMappingURL=begin.js.map