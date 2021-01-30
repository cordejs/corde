---
id: expect
title: Expect
custom_edit_url: https://github.com/lucasgmagalhaes/corde/blob/master/website/versioned_docs/version-2.0/expect.md
---

When testing functionalities with an bot, `expect` will let you define what a bot should do
given a command passed to it. All tests current available in this version(2.0) are listed bellow:

- [expect(value)](/docs/expect#expectcommandname-string)
- [not](/docs/expect#not)
- [toAddReaction(value)](/docs/expect#toaddreactionreaction-string)
- [toEditMessage(value)](/docs/expect#toeditmessagemessagedata-string--messageembed)
- [toPin(value)](/docs/expect#topinstring--messagedata)
- [toRemoveReaction(value)](/docs/expect#toremovereactionstring--string-messagedata)
- [toReturn(value)](/docs/expect#toreturn)
- [toUnPin(value)](/docs/expect#tounpinstring--messagedata)
- [toDeleteRole(value)](/docs/expect#todeleterolestring--roledata)
- [toRenameRole(value)](/docs/expect#torenamerolestring-roledata)
- [toSetRoleColor(value)](/docs/expect#tosetrolecolorcolorresolvable--colors-string--roledata)
- [toSetRoleHoist(value)](/docs/expect#tosetrolehoistboolean-string--roledata)
- [toSetRoleMentionable(value)](/docs/expect#tosetrolementionableboolean-string--roledata)
- [toSetRolePermission(value)](/docs/expect#tosetrolementionableboolean-string--roledata)
- [toSetRolePosition(value)](/docs/expect#tosetrolepermissionstring--roledata-rolepermission--rolepermission)

:::note
All examples bellow are only to ilustrate the functions called after
`expect`. These examples are not used exatly show they are described
in a real use case.
:::

## Reference

### expect(string)

Expect is a function that receives a command as argument. The same argument that you would send to
Discord to invoke some action from your bot. As there is a [prefix](/docs/configurations#botprefix) witch can
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

### not

Use `not` to deny some test after this keyword. It can be used to check if a operation
made by a bot command is anything but **not** something.

I.E:

```javascript
test("command hello should not return 1", () => {
  expect("hello").not.toReturn(1);
});
```

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

### toEditMessage(MessageData, string | MessageEmbed)

Use `toEditMessage` to check if a bot command edited a sent message.

```typescript
test("command x should edit a message", () => {
  // message: Message; -> content = "value";
  expect(`editMessage ${message.id}`).toEditMessage({ id: message.id }, "new value");
});
```

### toPin(string | MessageData)

use `toPin` to check if a bot command pinned a message in the channel.

![Example pinned message](/img/pinned_message.png)

```typescript
test("should pin a really important message", () => {
  // message: Message; -> content = "IMPORTANT MESSAGE";
  expect(`ping ${message.id}`).toPin(message.id);
});
```

### toRemoveReaction(string | string[], MessageData)

Use `toRemoveReaction` to check if an reaction or a list of reactions were removed
after a command call.

```typescript
test("bot remove reaction from message x", () => {
  // message: Message; (A message with reactions)
  expect(`removeReactions ${message.id}`).toRemoveReaction("😄", "🍊", { id: message.id });
});
```

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

### toUnpin(string | MessageData)

Use `toUnpin` to check if a bot command unpinned a message.

```typescript
test("should unPin a really important message", () => {
  // message: Message; -> content = "IMPORTANT MESSAGE";
  expect(`ping ${message.id}`).toUnpin(message.id);
});
```

### toDeleteRole(string | RoleData)

Use `toDeleteRole` to check if a bot command deleted a role in guild
defined in [guildId](/docs/configurations#guildid).

```typescript
test("should pin a really important message", () => {
  const role: Role; // Got from somewhere
  expect(`deleteRole ${role.id}`).toDelete(role.id);
  expect(`deleteRole ${role.id}`).toDelete({ id: role.id });
  expect(`deleteRole ${role.id}`).toDelete({ name: role.name });
});
```

### toRenameRole(string, RoleData)

Use `toRenameRole` to check if a bot command renamed a role.

```typescript
test("should rename a role", () => {
  const role: Role;
  // role.name = hight-master
  expect(`renameRole ${role.id}`).toRenameRole("dm-hight-master", role.id);
  expect(`renameRole ${role.id}`).toRenameRole("dm-hight-master", { id: role.id });
  expect(`renameRole ${role.id}`).toRenameRole("dm-hight-master", { name: role.name });
});
```

### toSetRoleColor(ColorResolvable | Colors, string | RoleData)

Use `toSetRoleColor` to check if a bot command set a new color to a role.

![Example pinned message](/img/role_color.png)

```typescript
test("should set a role color", () => {
  const role: Role;
  // role.name = hight-master
  expect(`setColor ${role.id}`).toSetRoleColor("GREEN", role.id);
  expect(`setColor ${role.id}`).toSetRoleColor(Colors.GREEN, role.id);
  expect(`setColor ${role.id}`).toSetRoleColor("GREEN", { id: role.id });
  expect(`setColor ${role.id}`).toSetRoleColor(Colors.GREEN, { id: role.id });
  expect(`setColor ${role.id}`).toSetRoleColor("GREEN", { name: role.name });
});
```

### toSetRoleHoist(boolean, string | RoleData)

Use `toSetRoleHoist` to check if a bot command set or not a role as hoist.

![Example mentionable role](/img/hoist_role.png)

_In a hoisted configuration, the role hierarchy is visibly clear to server members; roles are sorted and displayed based on which role is higher in the role management menu.
However, in a standard configuration, users are sorted alphabetically, meaning someone with the highest role will be sorted wherever their name exists in the alphabet._ [Discord](https://support.discord.com/hc/en-us/community/posts/360060076751-Un-hoisted-Role-Hierarchy)

```typescript
test("should set a role hoist", () => {
  const role: Role;
  // role.name = hight-master
  expect(`setHoist ${role.id}`).toSetRoleHoist(true, role.id);
  expect(`setHoist ${role.id}`).toSetRoleHoist(true, { id: role.id });
  expect(`setHoist ${role.id}`).toSetRoleHoist(false, { name: role.name });
});
```

### toSetRoleMentionable(boolean, string | RoleData)

Use `toSetRoleMentionable` to check if a bot command set or not a role as mentionable.

![Example mentionable role](/img/role_mentionable.png)

```typescript
test("should set a role mentionable", () => {
  const role: Role;
  // role.name = hight-master
  expect(`setMentionable ${role.id}`).toSetRoleMentionable(true, role.id);
  expect(`setMentionable ${role.id}`).toSetRoleMentionable(true, { id: role.id });
  expect(`setMentionable ${role.id}`).toSetRoleMentionable(false, { name: role.name });
});
```

### toSetRolePermission(string | RoleData, RolePermission | RolePermission[])

Use `toSetRolePermission` to check if a bot command set or remove a single,
or a list of permissions to a role.

![Example permissions of role](/img/role_permissions.png)

```typescript
test("should set Permissions to a role", () => {
  const role: Role;
  // role.name = hight-master
  expect(`setPermission VIEW_CHANNEL EMBED_LINKS`).toSetRoleMentionable(
    role.id,
    "VIEW_CHANNEL",
    "EMBED_LINKS",
  );
  expect(`setPermission VIEW_CHANNEL EMBED_LINKS`).toSetRoleMentionable(
    { id: role.id },
    "VIEW_CHANNEL",
    "EMBED_LINKS",
  );
  expect(`setPermission VIEW_CHANNEL EMBED_LINKS`).toSetRoleMentionable(
    { name: role.name },
    "VIEW_CHANNEL",
    "EMBED_LINKS",
  );
});
```
