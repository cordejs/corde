import util from 'util';
import { spawn, exec, ChildProcess } from 'child_process';
const execSync = util.promisify(require('child_process').exec);

export default class Shell {
  private static child: ChildProcess;
  static async commandRun(command: string) {
    const { stdout, stderr } = await execSync(command, { shell: false });
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  }

  static observe(command: string) {
    this.child = exec(command);

    this.child.on('exit', function (code) {
      console.log('Child process exited with exit code ' + code);
    });

    this.child.on('error', (error) => {
      console.log(error);
      this.stopChild();
    });
  }

  static stopChild() {
    console.log('tentando parar ' + this.child.pid);
    process.kill(this.child.pid);
  }
}
