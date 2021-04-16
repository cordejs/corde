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

import { logger, StackContainer } from "../src/logger";

describe("testing logger", () => {
  it("should call console.log", () => {
    logger.log("log");
    expect(spyLog).toBeCalledTimes(1);
    expect(spyLog).toBeCalledWith("log");
  });

  it("should call console.info", () => {
    logger.info("info");
    expect(spyInfo).toBeCalledTimes(1);
    expect(spyInfo).toBeCalledWith("info");
  });

  it("should call console.error", () => {
    logger.error("error");
    expect(spyError).toBeCalledTimes(1);
    expect(spyError).toBeCalledWith("error");
  });

  it("should call console.debug", () => {
    logger.debug("debug");
    expect(spyDebug).toBeCalledTimes(1);
    expect(spyDebug).toBeCalledWith("debug");
  });

  it("should call console.warn", () => {
    logger.warn("warn");
    expect(spyWarn).toBeCalledTimes(1);
    expect(spyWarn).toBeCalledWith("warn");
  });

  it("should call console.trace", () => {
    logger.trace("trace");
    expect(spyTrace).toBeCalledTimes(1);
    expect(spyTrace).toBeCalledWith("trace");
  });

  it("should call console.assert", () => {
    logger.assert("assert");
    expect(spyAssert).toBeCalledTimes(1);
    expect(spyAssert).toBeCalledWith("assert", undefined);
  });

  it("should call console.clear", () => {
    logger.clear();
    expect(spyClear).toBeCalledTimes(1);
  });

  it("should call console.count", () => {
    logger.count("count");
    expect(spyCount).toBeCalledTimes(1);
    expect(spyCount).toBeCalledWith("count");
  });

  it("should call console.countReset", () => {
    logger.countReset("test");
    expect(spyCountReset).toBeCalledTimes(1);
    expect(spyCountReset).toBeCalledWith("test");
  });

  it("should call console.dir", () => {
    logger.dir("dir");
    expect(spyDir).toBeCalledTimes(1);
    expect(spyDir).toBeCalledWith("dir");
  });

  it("should call console.spyDirXml", () => {
    logger.dirxml("spyDirXml");
    expect(spyDirXml).toBeCalledTimes(1);
    expect(spyDirXml).toBeCalledWith("spyDirXml");
  });

  if (console.exception) {
    it("should call console.exception", () => {
      logger.exception("exception");
      expect(spyException).toBeCalledTimes(1);
      expect(spyException).toBeCalledWith("exception");
    });
  }

  it("should call console.group", () => {
    logger.group("group");
    expect(spyGroup).toBeCalledTimes(1);
    expect(spyGroup).toBeCalledWith("group");
  });

  it("should call console.groupEnd", () => {
    logger.groupEnd();
    expect(spyGroupEnd).toBeCalledTimes(1);
  });

  if (console.profile) {
    it("should call console.profile", () => {
      logger.profile("profile");
      expect(spyProfile).toBeCalledTimes(1);
      expect(spyProfile).toBeCalledWith("profile");
    });
  }

  if (console.profileEnd) {
    it("should call console.profileEnd", () => {
      logger.profileEnd("profileEnd");
      expect(spyProfileEnd).toBeCalledTimes(1);
      expect(spyProfileEnd).toBeCalledWith("profileEnd");
    });
  }

  it("should call console.table", () => {
    logger.table("table");
    expect(spyTable).toBeCalledTimes(1);
    expect(spyTable).toBeCalledWith("table");
  });

  it("should call console.time", () => {
    logger.time("time");
    expect(spyTime).toBeCalledTimes(1);
    expect(spyTime).toBeCalledWith("time");
  });

  it("should call console.timeEnd", () => {
    logger.timeEnd("timeEnd");
    expect(spyTimeEnd).toBeCalledTimes(1);
    expect(spyTimeEnd).toBeCalledWith("timeEnd");
  });

  if (console.timeLog) {
    it("should call console.timeLog", () => {
      logger.timeLog("timeLog");
      expect(spyTimeLog).toBeCalledTimes(1);
      expect(spyTimeLog).toBeCalledWith("timeLog");
    });
  }

  if (console.timeStamp) {
    it("should call console.spyTimeStamp", () => {
      logger.timeStamp("spyTimeStamp");
      expect(spyTimeStamp).toBeCalledTimes(1);
      expect(spyTimeStamp).toBeCalledWith("spyTimeStamp");
    });
  }
});

describe("testing mocks", () => {
  beforeEach(() => {
    logger.mock();
  });

  afterEach(() => {
    logger.stack = [];
  });

  it("should not print in console.log", () => {
    const value = "messsage-log";
    console.log(value);
    expect(logger.stack).toEqual<StackContainer[]>([
      {
        name: "log",
        data: {
          printFunction: expect.any(Function),
          trace: expect.any(String),
          values: [value],
        },
      },
    ]);
  });

  it("should not print in console.warn", () => {
    const value = "messsage-warn";
    console.warn(value);
    expect(logger.stack).toEqual<StackContainer[]>([
      {
        name: "warn",
        data: {
          printFunction: expect.any(Function),
          trace: expect.any(String),
          values: [value],
        },
      },
    ]);
  });

  it("should not print in console.error", () => {
    const value = "messsage-error";
    console.error(value);
    expect(logger.stack).toEqual<StackContainer[]>([
      {
        name: "error",
        data: {
          printFunction: expect.any(Function),
          trace: expect.any(String),
          values: [value],
        },
      },
    ]);
  });

  it("should not print in console.info", () => {
    const value = "messsage-info";
    console.info(value);
    expect(logger.stack).toEqual<StackContainer[]>([
      {
        name: "info",
        data: {
          printFunction: expect.any(Function),
          trace: expect.any(String),
          values: [value],
        },
      },
    ]);
  });

  it("should not print in console.count", () => {
    const value = "messsage-count";
    console.count(value);
    expect(logger.stack).toEqual<StackContainer[]>([
      {
        name: "count",
        data: {
          printFunction: expect.any(Function),
          trace: expect.any(String),
          values: [value],
        },
      },
    ]);
  });
});
