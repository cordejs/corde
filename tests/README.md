# Corde tests

We do not send requests to Discord API in our tests. Our low levels tests(tests that make directly use of Discord.js API)
only assure that they are really calling Discord.js API.

Other tests only simulate the possible behavior of Discord API to Discord.js.

For a more confident tests, we are working on our end-to-end tests.
