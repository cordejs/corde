# trybot Testing

trybot is a typescript library to create automated tests for discord bots

## How it works ?

trybot uses two bots to send messages between then, the first one is the 'fake user', who will send the real bot.
The second one, is the bot that you want to test the commands. After configure which one is the fake user and the test bot,
you can write your case tests like this:

```js
test('crete user').run(
    {
        say: "create",
        wait: "What's your name ?"
    }, 
    {
        say: "jhon",
        wait: "Hello jhon, welcome to my bot!"
    }
)
```

Quite simple uh ?

trybot sintax is short and simple. Your `say` something to the bot, then you expect that he respond something to will,
so you gonna `wait` for a response.
