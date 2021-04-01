<div align="center">
  <br />
  <p>
    <img width="120" height="120" src="./website/static/img/logo/android-icon-192x192.png" />
  </p>
  <p>
   <!-- <a href="https://discord.gg/f3Gs7uU">
      <img src="https://img.shields.io/discord/768647567461449778?color=7289da&logo=discord&logoColor=white" alt="Discord server" />
    </a> -->
    <a href="https://gitpod.io/#https://github.com/lucasgmagalhaes/corde">
      <img
        alt="CircleCi"
        src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod"
      />
    </a>
    <br>
    <a href="https://circleci.com/gh/lucasgmagalhaes/corde">
      <img
        alt="CircleCi"
        src="https://img.shields.io/circleci/build/github/lucasgmagalhaes/corde"
      />
    </a>
    <a href="https://codecov.io/gh/lucasgmagalhaes/corde">
      <img
        alt="Codecov"
        src="https://img.shields.io/codecov/c/github/lucasgmagalhaes/corde"
      />
    </a>
    <a href="https://www.npmjs.com/package/corde">
      <img alt="Npm version" src="https://img.shields.io/npm/v/corde" />
    </a>
    <a href="https://nodei.co/npm/corde/">
      <img alt="npm" src="https://img.shields.io/npm/dt/corde"></a>
  </p>
</div>

## 😀 Table of Content

- [About](#-about)
- [Getting Started](#-getting-started)
- [Configurations](#%EF%B8%8F-configurations)

## 👀 About

Corde is a small testing library for Discord.js. As there is a tool to create bots for Discord, it's cool to also have a tool to test then. Corde objective is to be simple, fast, and readable to developers, such as many others unity test tools around the web.

## Documentation

The bellow documentation is a resume of what you can find in [Corde's site](https://corde.netlify.app)

## 🚀 Getting started

**Node.js 12.0.0 or newer is required**

Starting to create tests with Corde is simple. First, install it locally with npm `npm i -D corde` or yarn `yarn add -D corde`. You can also install it globally: `npm i -g corde` or `yarn global add corde`.

After installed, add the file `corde.config.json` in the root of your application with the following structure:

```javascript
{
   "cordeTestToken":  "YOUR_TESTING_BOT_TOKEN_HERE",
   "botTestId":  "YOUR_TESTING_BOT_ID_HERE",
   "botTestToken":  "YOUR_BOT_TOKEN_HERE",
   "guildId":  "THE_GUID_OF_BOT_HERE",
   "channelId":  "CHANNELS_ID_HERE",
   "botPrefix":  "+",
   "testFiles":  ["./test"]
}
```

Check the Config section for a more detailed explanation of each configuration property.

Now that the config file is created, let's create some tests. You can keep the unity test natural file name structure, creating a `bot.test.js` with the follow structure:

```javascript
const { group, test, command, beforeStart, afterAll } = require("corde");
const { client, loginBot } = require("..");

beforeStart(() => {
  loginBot();
});

group("main commands", () => {
  test("ping command must return... Ping?!!", () => {
    expect("ping").toReturn("Ping?");
  });
});

afterAll(() => {
  client.destroy();
});
```

What is happening?

1. `beforeStart` is a function that is used to run something **before** the execution of tests. Put there the instruction that makes the bot login i.e. You can also start the bot and then run all tests, with that, there is no need to use the `beforeStart` function.
2. `group` Is a collection of tests that refers to some sort of tests.
3. `test` Is the container of a test. it describes what will be tested, and what is the expectation.
4. `command` is the core of Corde, that is what really with validate if a command is or not executing what it should. The simplest action that a bot can do is send a plain message, with that, `command` has a collection of options of expectations of the response of the bot, in this case, is tested that a command _ping_ should return _pong_. 5)`afterAll` is a function that is used to run something **after** the execution of tests. Put there the instructions that make the logoff of the bot, i.e.

## ⚙️ Configurations

| Option         | Description                                          |
| -------------- | ---------------------------------------------------- |
| cordeTestToken | Bot's token that will send commands to the test bot. |
| botTestId      | Bot's id that is being tested.                       |
| botTestToken   | Bot's token of your tested bot.                      |
| botTestId      | Bot's id that is testing.                            |
| guildId        | Guild that your and the test bot are.                |
| channelId      | Channel that your and the test bot are.              |
| botPrefix      | Bot invoke-command prefix                            |
| testFiles      | Path where all tests files are                       |
