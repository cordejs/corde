import util from 'util';
const exec = util.promisify(require('child_process').exec);

export default class Shell {
  static async commandRun(command: string) {
    const { stdout, stderr } = await exec(command, { shell: false });
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  }
}
