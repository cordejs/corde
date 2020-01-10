import { getConfig } from '../init';

import { logger } from '../logger';
import { IConfigOptions } from '../config';

/**
 * Container of
 */
export class Assert {
  private input: string;
  private testName: string;

  constructor(input: string, testName: string) {
    this.input = input;
    this.testName = testName;
  }

  public async shouldRespond(expect: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const config = getConfig();
      validateEntryData(config, expect);
      const toSend = config.botPrefix + this.input;
      await config.channel.send(toSend);

      try {
        const answer = await config.channel.awaitMessages(
          responseName => responseName.author.id === config.botTestId,
          {
            max: 1,
            time: config.timeOut ? config.timeOut : 5000,
            errors: ['time'],
          },
        );

        const content = answer.first().content;

        if (content === expect) {
          logger.sucess(this.testName, expect, content);
          resolve(true);
        } else {
          logger.fail(this.testName, expect, content);
          resolve(false);
        }
      } catch (error) {
        console.log('Test timeout.');
        logger.fail(this.testName, expect, '');
        const _error = new Error();
        error.name = 'TIMEOUT';
        reject(_error);
      }
    });
  }
}

function validateEntryData(config: IConfigOptions, expect: string) {
  if (expect === undefined) {
    console.log('No testes were declared');
    process.exit(0);
  } else if (config.channel === undefined) {
    throw new Error('Channel not found');
  }
}
