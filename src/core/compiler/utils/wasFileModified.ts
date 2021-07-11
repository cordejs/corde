import * as fs from "fs";

export const wasFileModified = async (tsFilePath: string, jsFilePath: string) => {
  try {
    const [tsFileStat, jsFileStat] = await Promise.all([
      fs.promises.stat(tsFilePath),
      fs.promises.stat(jsFilePath),
    ]);
    return tsFileStat.mtimeMs > jsFileStat.mtimeMs;
  } catch (error) {
    return true;
  }
};
