<div align="center">
  <br />
  <p>
    <img width="120" height="120" src="./website/static/img/logo/android-icon-192x192.png" />
  </p>
  <p>
   <!-- <a href="https://discord.gg/f3Gs7uU">
      <img src="https://img.shields.io/discord/768647567461449778?color=7289da&logo=discord&logoColor=white" alt="Discord server" />
    </a> -->
    <a href="https://gitpod.io/#https://github.com/cordejs/corde">
      <img
        alt="CircleCi"
        src="https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod"
      />
    </a>
    <br>
    <a href="https://circleci.com/gh/cordejs/corde">
      <img
        alt="CircleCi"
        src="https://img.shields.io/circleci/build/github/cordejs/corde"
      />
    </a>
    <a href="https://codecov.io/gh/cordejs/corde">
      <img
        alt="Codecov"
        src="https://img.shields.io/codecov/c/github/cordejs/corde"
      />
    </a>
    <a href="https://www.npmjs.com/package/corde">
      <img alt="Npm version" src="https://img.shields.io/npm/v/corde" />
    </a>
    <a href="https://www.npmjs.com/package/corde">
      <img alt="npm" src="https://img.shields.io/npm/dt/corde"></a>
  </p>
</div>

## 😀 Table of Content

- [About](#-about)
- [Getting Started](#-getting-started)
- [Configurations](#%EF%B8%8F-configurations)

## 👀 About

Corde is a small testing library for Discord.js. As there is a tool to create bots for Discord, it's cool to also have a tool to test them. Corde objective is to be simple, fast, and readable to developers.

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
   "testMatches":  ["./test"]
}
```

Test example:

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
