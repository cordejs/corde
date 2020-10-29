import path from "path";
import fs from "fs";
import MockDiscord from "./mocks/mockDiscord";
import { Client } from "discord.js";
import { CordeBot } from "../src/core";

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

/**
 * Define a new value for a property. Useful for readonly propeties
 *
 * @param object Object that contains the property
 * @param property Object property to be mocked
 * @param value New value to property
 */
export function mockProperty<T extends {}, K extends keyof T>(object: T, property: K, value: T[K]) {
  Object.defineProperty(object, property, { get: () => value });
}

export function initCordeClientWithChannel(
  mockDiscord: MockDiscord,
  client: Client,
  timeout = 500,
) {
  client.guilds.cache.has = jest.fn().mockReturnValueOnce(true);
  client.guilds.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.guild);

  mockDiscord.guild.channels.cache.has = jest.fn().mockReturnValueOnce(true);
  mockDiscord.guild.channels.cache.find = jest.fn().mockReturnValueOnce(mockDiscord.textChannel);
  return initCordeClient(mockDiscord, client, timeout);
}

export const DEFAULT_PREFIX = "!";

export function initCordeClient(mockDiscord: MockDiscord, clientInstance: Client, timeout = 500) {
  return new CordeBot(
    DEFAULT_PREFIX,
    mockDiscord.guild.id,
    mockDiscord.channel.id,
    timeout,
    mockDiscord.userBotId,
    clientInstance,
  );
}

export function createCordeBotWithMockedFunctions(
  mockDiscord: MockDiscord,
  findRoleMock: any = mockDiscord.role,
) {
  const corde = initCordeClientWithChannel(mockDiscord, new Client());
  corde.getRoles = jest.fn().mockReturnValue(mockDiscord.roleManager.cache);
  corde.findRole = jest.fn().mockReturnValue(findRoleMock);
  corde.sendTextMessage = jest.fn().mockImplementation(() => {});
  return corde;
}
