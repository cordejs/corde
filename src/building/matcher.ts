import Thread from './thread';
import {
  messageType,
  messageExpectationType,
  Matches,
  TestReport,
  MatchesWithNot,
} from '../models';
import { MessageEmbed } from 'discord.js';
import assert from 'assert';

export function matcherWithNot(commandName: string): MatchesWithNot {
  return {
    not: matcher(commandName, false),
    ...matcher(commandName, true),
  };
}

export default function matcher(commandName: string, isTrueMacther: boolean): Matches {
  return {
    async mustReturn(expect: string | MessageEmbed) {
      Thread.testsFunctions.push(async (cordeBot) => {
        let msg = '';
        let isEqual = false;
        let showExpectAndOutputValue = true;
        if (typeof expect === 'string') {
          msg = (await cordeBot.sendTextMessage(commandName, 'text')) as string;
          isEqual = msg === expect;
        } else {
          const json = await cordeBot.sendTextMessage(commandName, 'embed');
          msg = json as string;
          showExpectAndOutputValue = false;
          try {
            assert.deepEqual(expect.toJSON(), json);
            isEqual = true;
          } catch (error) {
            isEqual = false;
          }
        }

        return {
          commandName,
          expectation: expect,
          output: msg,
          testSucessfully: isEqual,
          isTrueMacther,
          showExpectAndOutputValue,
        } as TestReport;
      });
    },
    mustNotReturn(notExpect: string | MessageEmbed) {
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
      commandName,
      usingTrueStatement,
      messageType,
    });
  }
}
