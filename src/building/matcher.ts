import Thread from './thread';
import { Group, messageType, messageExpectationType } from './models';
import log from '../utils/log';
import { MessageEmbed } from 'discord.js';

export class Matcher {
  private commandName: string;

  constructor(input: string) {
    this.commandName = input;
  }

  public shouldReturn(expect: string | MessageEmbed) {
    if (typeof expect === 'string') {
      this.return(expect);
    } else {
      this.return(expect, true, 'embed');
    }
  }

  public shouldNotReturn(notExpect: string) {
    this.return(notExpect, false);
  }

  private return(
    expect: messageExpectationType,
    usingTrueStatement: boolean = true,
    messageType: messageType = 'text',
  ) {
    Thread.isBuildRunning = true;
    if (Thread.hasTest || Thread.hasGroup) {
      Thread.assertions.push({
        expectation: expect,
        commandName: this.commandName,
        usingTrueStatement: usingTrueStatement,
        messageType: messageType,
      });
    } else {
      const group: Group = {
        tests: [
          {
            assertions: [
              {
                expectation: expect,
                commandName: this.commandName,
                usingTrueStatement: usingTrueStatement,
                messageType: messageType,
              },
            ],
          },
        ],
      };

      log.out(group);
    }
  }
}
