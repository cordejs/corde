import { FilesNotFoundError } from '../errors';
import path from 'path';
import Thread from '../building/thread';
import fs from 'fs';
import * as ts from 'typescript';

export async function getTestList(files: string[]) {
  if (files) {
    const cwd = process.cwd();
    Thread.isBuildRunning = true;
    Thread.groups = [];
    for (const i in files) {
      if (files.hasOwnProperty(i)) {
        console.log('\nFILE PATH: ' + files[i]);
        const _path = require.resolve(files[i]);
        const dir = 'D:/github/corde/cordeTest/test';
        console.log('RESOLVE DIR: ' + path);
        console.log('DIR LOCAL: ' + path.relative(__dirname, files[i]));
        process.execPath = dir;
        process.chdir(dir);
        __dirname = dir;
        const file = fs.readFileSync('../../cordeTest/test/bot.test.ts').toString();
        eval(file);
      }
    }
    process.chdir(cwd);
    Thread.isBuildRunning = false;
    console.log(Thread.groups);
    return Thread.groups;
  }
  throw new FilesNotFoundError();
}
