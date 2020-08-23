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
  public get writeFileSyncArgs() {
    return (fs.writeFileSync as jest.Mock).mock.calls[0][0];
  }

  public get getCreatedFileContent() {
    return (fs.writeFileSync as jest.Mock).mock.calls[0][1];
  }

  public convertCreatedFileContentToModule() {
    return requireFromString(this.getCreatedFileContent);
  }

  public createMockForWriteFileSync(impl?: () => void) {
    const fsImpl = impl ? impl : () => {};
    (fs.writeFileSync as jest.Mock).mockImplementation(fsImpl);
  }

  public mockReadFileSync(impl?: () => string | Buffer | BufferEncoding) {
    const fsImpl = impl
      ? impl
      : (): string | Buffer | BufferEncoding => {
          return null;
        };
    (fs.readFileSync as jest.Mock).mockImplementation(fsImpl);
  }

  public buildFilePath(fileName: string) {
    return path.resolve(process.cwd(), fileName);
  }
}
