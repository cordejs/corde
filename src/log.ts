class Log {
  /**
   * Send a objet to process.stdout
   */
  static out(obj: object | object[]) {
    if (!obj) {
      return;
    } else if (obj as []) {
      process.stdout.write(JSON.stringify(obj));
    }
  }
}

const log = Log;
export default log;
