import path from "path";
import fs from "fs";

export const normalTsPath = path.resolve(process.cwd(), "corde.ts");
export const tempTsPath = path.resolve(process.cwd(), "__corde.ts");

export const normalJsPath = path.resolve(process.cwd(), "corde.js");
export const tempJsPath = path.resolve(process.cwd(), "__corde.js");

export const normalJsonPath = path.resolve(process.cwd(), "corde.json");
export const tempJsonPath = path.resolve(process.cwd(), "__corde.json");

export function getFullConsoleLog(log: [any?, ...any[]][]) {
  let stringValue = "";
  for (const value1 of log) {
    for (const value2 of value1) {
      stringValue += `${value2}\n`;
    }
  }
  return stringValue;
}

export function renameConfigFilesToTempNames() {
  if (fs.existsSync(normalTsPath)) {
    fs.renameSync(normalTsPath, tempTsPath);
  }

  if (fs.existsSync(normalJsPath)) {
    fs.renameSync(normalJsPath, tempJsPath);
  }

  if (fs.existsSync(normalJsonPath)) {
    fs.renameSync(normalJsonPath, tempJsonPath);
  }
}

export function renameConfigTempFileNamesToNormal() {
  if (fs.existsSync(tempTsPath)) {
    fs.renameSync(tempTsPath, normalTsPath);
  }

  if (fs.existsSync(tempJsPath)) {
    fs.renameSync(tempJsPath, normalJsPath);
  }

  if (fs.existsSync(tempJsonPath)) {
    fs.renameSync(tempJsonPath, normalJsonPath);
  }
}
