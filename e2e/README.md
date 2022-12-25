# End to End Corde tests

Here you will find all real tests of corde api. All tests are executed against Discord, so
as each test must be sequential, witch make execution of all test cases prettier slow.

to execute all tests run in terminal:

```shell
yarn e2e
```

Repeating, this is a slower testing process, to testing only what you want run:

```shell
yarn jest ./e2e/toReturn --config=./e2e/jest.config.ts
```

### Tests structure

Each api function have it's own folder where is tested different cases.
Take the following structure as example:

    .
    ├── toReturn
    │ ├── __cordeTest__             # Contains scripts of Corde tests
    │     ├── bot_case1.spec.ts     # Naming convention for test file
    └── toReturn.case1.test.ts      # Test case for Jest to run

About the others files, they can be described as:

| File            | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| bot.js          | Contains a mock to be used as example of test                                  |
| cliRunner.ts    | Execute all commands of corde in a spawned terminal and collect it's responses |
| connect.ts      | It's a file to connect bot.js directly in terminal                             |
| corde.config.js | Configuration file for corde tests in this folder                              |
| testUtils.ts    | Functions to facilitate tests                                                  |
