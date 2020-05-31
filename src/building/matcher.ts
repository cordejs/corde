import Thread from './thread';
import { messageType, messageExpectationType, Matches } from './models';
import { MessageEmbed } from 'discord.js';

export default function matcher(commandName: string): Matches {
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
      _buildAssertion(expect, true, 'text', commandName);
    } else {
      _buildAssertion(expect, isTrueStatement, 'embed', commandName);
    }
  }

  function _buildAssertion(
    expect: messageExpectationType,
    usingTrueStatement: boolean = true,
    messageType: messageType = 'text',
    commandName: string,
  ) {
    Thread.isBuildRunning = true;
    Thread.assertions.push({
      expectation: expect,
      commandName: commandName,
      usingTrueStatement: usingTrueStatement,
      messageType: messageType,
    });
  }
}
