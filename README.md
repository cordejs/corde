# corde Testing

[![Greenkeeper badge](https://badges.greenkeeper.io/lucasgmagalhaes/corde.svg)](https://greenkeeper.io/)
[![CircleCI](https://circleci.com/gh/lucasgmagalhaes/corde.svg?style=shield)](https://circleci.com/gh/lucasgmagalhaes/corde)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Flucasgmagalhaes%2Fcorde.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Flucasgmagalhaes%2Fcorde?ref=badge_shield)

corde is a typescript library to create automated tests for discord bots

## How it works ?

corde uses two bots to send messages between then, the first one is the 'fake user', who will send the real bot.
The second one, is the bot that you want to test the commands. After configure which one is the fake user and the test bot,
you can write your case tests like this:

```ts
env(async () => {
    await it("should return Hello", async () => {
         await expect("hello").toBe("hello!!");
         await expect("hey").toBe("hey!!");
    });
});

```

Quite simple uh ?

corde sintax is short and simple. Your `say` something to the bot, then you expect that he respond something to will,
so you gonna `wait` for a response.
