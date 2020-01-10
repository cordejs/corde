import sh from 'shelljs';
import { logout } from './bot';
import { getConfig } from './init';
import { logger } from './logger';

export async function execFiles(dir: string | string[]) {
  if (dir) {
    (dir as string[]).forEach(async fileFullPath => {
      // Execute all test cases
      try {
        await runShell(`ts-node ${fileFullPath}`);
        logger.info('\n');
        logger.info('All tests passed');
      } catch (error) {
        if (error instanceof Error && error.name === 'TIMEOUT') {
          logger.info('Test fail');
        } else {
          logger.info(error);
          logout();
          process.exit(1);
        }
      }
    });
  } else {
    runShell(`${getConfig().testFilesDir}/${dir}`);
  }
}

async function runShell(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    sh.exec(command, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}
