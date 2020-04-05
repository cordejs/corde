import { TestResult } from './test';
import util from 'util';
import { FilesNotFoundError } from './errors';
const exec = util.promisify(require('child_process').exec);

export async function getTestsList(files: string[]) {
  if (files) {
    const output: TestResult[] = [];
    for (const i in files) {
      if (files.hasOwnProperty(i)) {
        const { stdout, stderr } = await exec(`ts-node ${files[i]}`, { shell: false });
        if (stderr) {
          console.log(stderr);
        } else {
          output.push(JSON.parse(stdout));
        }
      }
    }

    return output;
  }
  throw new FilesNotFoundError();
}
