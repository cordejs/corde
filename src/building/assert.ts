import Thread from './thread';
import { Group } from './models';
import log from '../utils/log';
import { MessageEmbed } from 'discord.js';

export class Assert {
  private commandName: string;
  private usingTrueStatement = true;
  constructor(input: string) {
    this.commandName = input;
  }

  public get not() {
    this.usingTrueStatement = false;
    return this;
  }

  public returnMessage(expect: string | MessageEmbed) {
    Thread.isBuildRunning = true;
    if (Thread.hasTest || Thread.hasGroup) {
      Thread.assertions.push({
        expectation: expect,
        commandName: this.commandName,
        usingTrueStatement: this.usingTrueStatement,
      });
    } else {
      const group: Group = {
        tests: [
          {
            assertions: [
              {
                expectation: expect,
                commandName: this.commandName,
                usingTrueStatement: this.usingTrueStatement,
              },
            ],
          },
        ],
      };

      log.out(group);
    }
  }
}
