---
id: hooks
title: Hooks
custom_edit_url: https://github.com/lucasgmagalhaes/corde/blob/master/website/versioned_docs/version-2.0/hooks.md
---

Hooks are functions triggered in different ocassions in corde tests executions
All hooks are available bellow:

- [afterAll](/docs/hooks#afterAll)
- [afterEach](/docs/hooks#afterEach)
- [beforeEach](/docs/hooks#beforeEach)
- [beforeStart](/docs/hooks#beforeStart)

### afterAll(function)

Use `afterAll` to execute something that you want to be executed after all tests run.
A good example of something to be executed after all tests is the logout of your testing
bot.

I.E:

```typescript
afterAll(() => {
  bot.destroy();
});
```

:::note
As corde self make it's bot login, it's make their logout also. So there is no need
to worry about it.
:::
