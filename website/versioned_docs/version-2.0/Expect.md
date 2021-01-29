---
id: expect
title: Expect
custom_edit_url: https://github.com/lucasgmagalhaes/corde/blob/master/website/versioned_docs/version-2.0/expect.md
---

When testing functionalities with an bot, `expect` will let you define what a bot should do
given a command passed to it. All tests current available in this version(2.0) are listed bellow:

- [expect](/docs/expect#expectcommandname-string)
- [toAddReaction](/docs/expect#toaddreactionreaction-string)
- [toEditMessage](/docs/expect#toreturn)
- [toPinMessage](/docs/expect#toreturn)
- [toRemoveReaction](/docs/expect#toreturn)
- [toReturn](/docs/expect#toreturn)
- [toUnPinMessage](/docs/expect#toreturn)
- [toDeleteRole](/docs/expect#toreturn)
- [toRenameRole](/docs/expect#toreturn)
- [toSetRoleColor](/docs/expect#toreturn)
- [toSetRoleHoist](/docs/expect#toreturn)
- [toSetRoleMentionable](/docs/expect#toreturn)
- [toSetRolePermission](/docs/expect#toreturn)
- [toSetRolePosition](/docs/expect#toreturn)

## Reference

### expect(string)

Expect is a function that receives a command as argument. The same argument that you would send to
Discord to invoke some action from your bot. As there is a [prefix](/docs/configuration#botprefix) witch can
be passed in config file, there is no need to pass that prefix in `expect` function.

I.E:

Suposing that there is a bot with prefix **!** and that bot has a command called **createAGuild**, you can
use `expect` like the example bellow:

```javascript
expect("createAGuild");
```

This function returns a several other functions to define what Corde should check after that command be invoke.

:::note
If for some reason you what to pass the bot prefix in `expect`, do not use the config variable [prefix](/docs/configuration#botprefix).
:::

### toAddReaction(string | string[])

Use `toAddReaction` to check if the bot added an reaction or an list of reactions to **the last message sent by someone who is not a bot**.

I.E:

Given a bot who has a command called `addReactions` and add the reactions 😄 and 🍊,
you can write a test like:

```typescript
test("bot should return Hello!!", () => {
  expect("addReactions").toAddReaction("😄", "🍊");
});
```

:::note
This example is only to ilustrate how this test can be used, not an real case usage of this. We also will allow add the id of an message, in this test in the future.
:::

### toReturn(string | boolean | number | MessageEmbed)

Use `toReturn` to check if the bot send a primitive message value or an EmbedMessage after call of an
command passed in `expect`.

I.E:

Given a bot who has a command called `hi` and return `Hello!!`, you can test it with:

```typescript
test("bot should return Hello!!", () => {
  expect("hi").toReturn("Hello!!");
});
```

If the command returns a embedMessage (we use Discord.js object) , it can be done like:

```typescript
test("bot should return Hello!!", () => {
  const embedMsg = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Some title")
    .setURL("https://discord.js.org/")
    .setAuthor("Some name", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
    .setDescription("Some description here")
    .setThumbnail("https://i.imgur.com/wSTFkRM.png")
    .addFields(
      { name: "Regular field title", value: "Some value here" },
      { name: "\u200B", value: "\u200B" },
      { name: "Inline field title", value: "Some value here", inline: true },
      { name: "Inline field title", value: "Some value here", inline: true },
    )
    .addField("Inline field title", "Some value here", true)
    .setImage("https://i.imgur.com/wSTFkRM.png");

  expect("hi").toReturn(embedMsg);
});
```

<!-- ```typescript
bot.on('message', async (message) => {
    if (command === 'emoji') {
        msg.react('😄');
    } else if(command === 'emojis') {
        Promise.all([msg.react('😄'), msg.react('🍊')]);
    }
});

Tests:

expect('emoji').toAddReaction('😄');
expect('emojis').toAddReaction('😄', '🍊');
``` -->
