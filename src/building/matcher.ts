import Thread from './thread';
import { messageType, messageExpectationType, Matches, TestReport } from '../models';
import { MessageEmbed } from 'discord.js';
import runtime from '../runtime';

export default function matcher(commandName: string): Matches {
  return {
    shouldReturn: async function (expect: string | MessageEmbed) {
      Thread.testsFunctions.push(async (cordeBot) => {
        let msg = '';

        if (typeof expect === 'string') {
          msg = (await cordeBot.sendTextMessage(commandName, 'text')) as string;
        } else {
          const json = await cordeBot.sendTextMessage(commandName, 'embed');
          msg = JSON.stringify(json);
        }

        return {
          commandName: commandName,
          expectation: expect,
          output: msg,
          testSucessfully: expect === msg,
          isDenyTest: false,
        } as TestReport;
      });
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
