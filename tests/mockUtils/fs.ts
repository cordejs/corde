import fs from "fs";
import path from "path";
import requireFromString from "require-from-string";

/**
 * Contain utilities for fs modules functions
 * This class must instantialized after mock fs
 * @example
 *
 * jest.mock("fs");
 * const fs = new FsMockUtils();
 *
 */
export class FsMockUtils {
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

  public buildFilePath(fileName: string) {
    return path.resolve(process.cwd(), fileName);
  }
}
