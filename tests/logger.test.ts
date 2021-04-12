const spyLog = jest.spyOn(console, "log");
const spyInfo = jest.spyOn(console, "info");
const spyError = jest.spyOn(console, "error");
const spyWarn = jest.spyOn(console, "warn");
const spyDebug = jest.spyOn(console, "debug");
const spyTrace = jest.spyOn(console, "trace");
const spyAssert = jest.spyOn(console, "assert");
const spyClear = jest.spyOn(console, "clear");
const spyCount = jest.spyOn(console, "count");
const spyCountReset = jest.spyOn(console, "countReset");
const spyDir = jest.spyOn(console, "dir");
const spyDirXml = jest.spyOn(console, "dirxml");

let spyException: jest.SpyInstance<void, [message?: string, ...optionalParams: any[]]>;
if (console.exception) {
  spyException = jest.spyOn(console, "exception");
}

const spyGroup = jest.spyOn(console, "group");
const spyGroupCollapsed = jest.spyOn(console, "groupCollapsed");
const spyGroupEnd = jest.spyOn(console, "groupEnd");

let spyProfile: jest.SpyInstance<void, [label?: string]>;
if (console.profile) {
  spyProfile = jest.spyOn(console, "profile");
}

let spyProfileEnd: jest.SpyInstance<void, [label?: string]>;
if (console.profileEnd) {
  spyProfileEnd = jest.spyOn(console, "profileEnd");
}

const spyTable = jest.spyOn(console, "table");
const spyTime = jest.spyOn(console, "time");
const spyTimeEnd = jest.spyOn(console, "timeEnd");
const spyTimeLog = jest.spyOn(console, "timeLog");

let spyTimeStamp: jest.SpyInstance<void, [label?: string]>;
if (console.timeStamp) {
  spyTimeStamp = jest.spyOn(console, "timeStamp");
}

import { logger } from "../src/logger";

describe("testing logger", () => {
  it("should call console.log", () => {
    logger.log("test");
    expect(spyLog).toBeCalledTimes(1);
    expect(spyLog).toBeCalledWith("test");
  });

  it("should call console.info", () => {
    logger.info("test");
    expect(spyInfo).toBeCalledTimes(1);
    expect(spyInfo).toBeCalledWith("test");
  });

  it("should call console.error", () => {
    logger.error("test");
    expect(spyError).toBeCalledTimes(1);
    expect(spyError).toBeCalledWith("test");
  });

  it("should call console.debug", () => {
    logger.debug("test");
    expect(spyDebug).toBeCalledTimes(1);
    expect(spyDebug).toBeCalledWith("test");
  });

  it("should call console.warn", () => {
    logger.warn("test");
    expect(spyWarn).toBeCalledTimes(1);
    expect(spyWarn).toBeCalledWith("test");
  });

  it("should call console.trace", () => {
    logger.trace("test");
    expect(spyTrace).toBeCalledTimes(1);
    expect(spyTrace).toBeCalledWith("test");
  });

  it("should call console.assert", () => {
    logger.assert("test");
    expect(spyAssert).toBeCalledTimes(1);
    expect(spyAssert).toBeCalledWith("test", undefined);
  });

  it("should call console.clear", () => {
    logger.clear();
    expect(spyClear).toBeCalledTimes(1);
  });

  it("should call console.count", () => {
    logger.count("test");
    expect(spyCount).toBeCalledTimes(1);
    expect(spyCount).toBeCalledWith("test");
  });

  it("should call console.countReset", () => {
    logger.countReset("test");
    expect(spyCountReset).toBeCalledTimes(1);
    expect(spyCountReset).toBeCalledWith("test");
  });

  it("should call console.dir", () => {
    logger.dir("test");
    expect(spyDir).toBeCalledTimes(1);
    expect(spyDir).toBeCalledWith("test");
  });

  it("should call console.spyDirXml", () => {
    logger.dirxml("test");
    expect(spyDirXml).toBeCalledTimes(1);
    expect(spyDirXml).toBeCalledWith("test");
  });

  if (console.exception) {
    it("should call console.exception", () => {
      logger.exception("test");
      expect(spyException).toBeCalledTimes(1);
      expect(spyException).toBeCalledWith("test");
    });
  }

  it("should call console.group", () => {
    logger.group("test");
    expect(spyGroup).toBeCalledTimes(1);
    expect(spyGroup).toBeCalledWith("test");
  });

  it("should call console.groupCollapsed", () => {
    logger.groupCollapsed("test");
    expect(spyGroup).toBeCalledTimes(1);
    expect(spyGroup).toBeCalledWith("test");
  });

  it("should call console.groupEnd", () => {
    logger.groupEnd();
    expect(spyGroupEnd).toBeCalledTimes(1);
  });

  if (console.profile) {
    it("should call console.profile", () => {
      logger.profile("label");
      expect(spyProfile).toBeCalledTimes(1);
      expect(spyProfile).toBeCalledWith("label");
    });
  }

  if (console.profileEnd) {
    it("should call console.profile", () => {
      logger.profileEnd("label");
      expect(spyProfileEnd).toBeCalledTimes(1);
      expect(spyProfileEnd).toBeCalledWith("label");
    });
  }

  it("should call console.table", () => {
    logger.table("label");
    expect(spyTable).toBeCalledTimes(1);
    expect(spyTable).toBeCalledWith("label");
  });

  it("should call console.time", () => {
    logger.time("label");
    expect(spyTime).toBeCalledTimes(1);
    expect(spyTime).toBeCalledWith("label");
  });

  it("should call console.timeEnd", () => {
    logger.timeEnd("label");
    expect(spyTimeEnd).toBeCalledTimes(1);
    expect(spyTimeEnd).toBeCalledWith("label");
  });
});
