import Thread from './thread';
import { messageType, messageExpectationType, Matches, TestReport } from '../models';
import { MessageEmbed } from 'discord.js';
import assert from 'assert';

export default function matcher(commandName: string): Matches {
  return {
    shouldReturn: async function (expect: string | MessageEmbed) {
      Thread.testsFunctions.push(async (cordeBot) => {
        let msg = '';
        let isEqual = false;
        let showExpectAndOutputValue = true;
        if (typeof expect === 'string') {
          msg = (await cordeBot.sendTextMessage(commandName, 'text')) as string;
          isEqual = msg === expect;
        } else {
          const json = await cordeBot.sendTextMessage(commandName, 'embed');
          msg = JSON.stringify(json);
          showExpectAndOutputValue = false;
          try {
            assert.deepEqual(expect, json);
            isEqual = true;
          } catch (error) {
            isEqual = false;
          }
        }

        return {
          commandName: commandName,
          expectation: expect,
          output: msg,
          testSucessfully: isEqual,
          isDenyTest: false,
          showExpectAndOutputValue: false,
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
