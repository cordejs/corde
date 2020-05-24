import Thread from './thread';
import { Group, messageType, messageExpectationType } from './models';
import log from '../utils/log';
import { MessageEmbed, Message } from 'discord.js';

export interface Matches {
  shouldReturn(expect: string | MessageEmbed): void;
  shouldNotReturn(notExpect: string | MessageEmbed): void;
}

export function matcher(commandName: string): Matches {
  return {
    shouldReturn: function (expect: string | MessageEmbed) {
      _buildShouldReturnMatch(expect, true);
    },
    shouldNotReturn: function (notExpect: string | MessageEmbed) {
      _buildShouldReturnMatch(notExpect, false);
    },
  };

  function _buildShouldReturnMatch(expect: messageExpectationType, isTrueStatement: boolean) {
    if (typeof expect === 'string') {
      buildAssertion(expect, true, 'text', commandName);
    } else {
      buildAssertion(expect, isTrueStatement, 'embed', commandName);
    }
  }

  function buildAssertion(
    expect: messageExpectationType,
    usingTrueStatement: boolean = true,
    messageType: messageType = 'text',
    commandName: string,
  ) {
    Thread.isBuildRunning = true;
    if (Thread.hasTest || Thread.hasGroup) {
      Thread.assertions.push({
        expectation: expect,
        commandName: commandName,
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
                commandName: commandName,
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
