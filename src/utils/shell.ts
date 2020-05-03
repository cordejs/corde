import util from 'util';
import { ChildProcess, execSync, exec } from 'child_process';
import os from 'os';

const _execSync = util.promisify(require('child_process').exec);

export default class Shell {
  private static child: ChildProcess;
  static async commandRun(command: string) {
    const { stdout, stderr } = await _execSync(command, { shell: false });
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout;
  }

  static observe(command: string, cwd: string) {
    this.child = exec(command, { cwd: cwd });

    this.child.on('error', (error) => {
      console.log(error);
      this.stopChild();
    });
    return this.child;
  }

  static stopChild() {
    try {
      console.log(this.child.pid);
      console.log(process.pid);
      process.kill(this.child.pid);
      if (os.platform() === 'win32') {
        execSync(`taskkill /F /T /PID ${process.pid}`); // windows specific
      } else {
        this.child.kill();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
