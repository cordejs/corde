import fs from "fs";
import path from "path";
import requireFromString from "require-from-string";

export class FsMockUtils {
  /**
   * Contain utilities for fs modules functions
   * This class must instantialized after mock fs
   * @example
   *
   * jest.mock("fs");
   * const fs = new FsMockUtils();
   *
   */
  constructor() {}
  get writeFileSyncArgs() {
    return (fs.writeFileSync as jest.Mock).mock.calls[0][0];
  }

  get getCreatedFileContent() {
    return (fs.writeFileSync as jest.Mock).mock.calls[0][1];
  }

  convertCreatedFileContentToModule() {
    return requireFromString(this.getCreatedFileContent);
  }

  createMockForWriteFileSync(impl?: () => void) {
    const fsImpl = impl ? impl : () => {};
    (fs.writeFileSync as jest.Mock).mockImplementation(fsImpl);
  }

  mockReadFileSync(impl?: () => string | Buffer | BufferEncoding) {
    const fsImpl = impl
      ? impl
      : (): string | Buffer | BufferEncoding => {
          return null;
        };
    (fs.readFileSync as jest.Mock).mockImplementation(fsImpl);
  }

  buildFilePath(fileName: string) {
    return path.resolve(process.cwd(), fileName);
  }
}
