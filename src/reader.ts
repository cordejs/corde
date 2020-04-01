import { TestResult } from './test';
import util from 'util';
const exec = util.promisify(require('child_process').exec);

export async function getTestsList(files: string[]) {
  if (files) {
    let output: TestResult[] = [];
    for (let i in files) {
      const { stdout, stderr } = await exec(`ts-node ${files[i]}`, { shell: false });
      if (stderr) {
        console.log(stderr);
      } else {
        output.push(JSON.parse(stdout));
      }
    }

    return output;
  }
  throw new Error('Files not Informed');
}
