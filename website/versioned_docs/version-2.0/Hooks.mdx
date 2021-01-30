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

:::note
These functions are valid for all tests executions. If you add some of then inside a `group`
or a `test`, corde will not add then to that scope. This feature will be released in the next version of corde.

This means that:

```typescript
group("test groups", () => {
  beforeEeach(() => {
    console.log("I'll back");
  });

  test("test 1", () => {
    expect("hi").toReturn("hello");
  });
});

test("test 2", () => {
  expect("hi").toReturn("hello");
});
```

Will work like:

```typescript
// I'll back
// test 1
// I'll back
// test 2
```

:::

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

### afterEach(function)

Use `afterEach` to execute something after execution of a test case. As metioned above,
this function is not included to clausures like `group` and `test`, if you call it, this function will be included for all tests (yet).

A exemplification of usage of `afterEach`

```typescript
afterEach(() => {
  console.log("I'm your father");
});

test("test 1", () => {
  expect("hi").toReturn("hello");
});

test("test 2", () => {
  expect("hi").toReturn("hello");
});

// Work like:
// Run test 1
// I'm your father
// Run test 2
// I'm your father
// Done
```

### beforeEach(function)

Use `beforeEach` to execute something before operation of each test case.

```typescript
beforeEach(() => {
  console.log("One ring to rule them all");
});

test("test 1", () => {
  expect("hi").toReturn("hello");
});

test("test 2", () => {
  expect("hi").toReturn("hello");
});

// Work like:
// One ring to rule them all
// Run test 1
// One ring to rule them all
// Run test 2
// Done
```

### beforeStart(function)

Use `beforeStart` to execute some function before all tests begin.

This can be, for instance, the login of your bot.

```typescript
beforeStart(async () => {
  await bot.login();
});
```

:::note
In corde tests lifecycle, all these functions are executed **after** corde login, this
bot. Functions to be executed before it will be created future versions of corde.
:::

The image bellow ilustrate the operation of each hook:

![Corde hooks lifecycle](/img/corde_hooks_lifecycle.png)
