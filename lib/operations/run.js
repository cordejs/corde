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
const initializer_1 = __importDefault(require("src/initializer"));
class runTest {
    constructor(testName) {
        this.testName = testName;
    }
    run(...steps) {
        return __awaiter(this, void 0, void 0, function* () {
            let testsOk = true;
            if (steps === undefined) {
                this.sendPassedResponse();
            }
            else {
                steps.forEach((step) => __awaiter(this, void 0, void 0, function* () {
                    yield initializer_1.default.message.channel.send(step.say);
                    const answer = yield initializer_1.default.message.channel.awaitMessages(responseName => responseName.author.id === initializer_1.default.botTestId, {
                        max: 1,
                        time: initializer_1.default.timeOut ? initializer_1.default.timeOut : 10000,
                        errors: ["time"]
                    });
                    if (answer.first().content === step.wait) {
                        this.sendPassedResponse();
                    }
                    else {
                        this.sendErrorResponse(step.wait.toString(), answer.first().content);
                        testsOk = false;
                    }
                }));
                if (testsOk) {
                    const okMessage = "All tests finished successfully";
                    console.info(okMessage);
                    initializer_1.default.message.channel.send(okMessage);
                }
                else {
                    const failMessage = "Tests runned with errors";
                    console.info(failMessage);
                    initializer_1.default.message.channel.send(failMessage);
                }
            }
        });
    }
    sendPassedResponse() {
        console.info(`${this.testName} passed successfully`);
    }
    sendErrorResponse(expected, response) {
        console.error(`${this.testName} not passed successfully. Expected ${expected} to be ${response} `);
    }
}
exports.default = runTest;
//# sourceMappingURL=run.js.map