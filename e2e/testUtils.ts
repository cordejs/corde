import { Message } from "discord.js";
import { testCollector } from "../lib/src/common/testCollector";

export default class Utils {
  static parseCommand(message: Message, prefix: string) {
    if (message.content.indexOf("") !== 0) return "";
    const args = message.content.slice(prefix.length).trim().split(" ");
    return args.shift().toLowerCase();
  }

  static buildCommandWithConfigPath(folderName: string, testFileName: string) {
    return `--files ./e2e/${folderName}/__cordeTest__/${testFileName}`;
  }

  static addEmptyTest() {
    testCollector.addTestFunction(() => null);
  }
}
