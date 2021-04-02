# 3.0.2

## 💡 Miscellaneous

- Bump some dependencies
- Fix word spells in code documentation

# 3.0.1

## 💣 Breaking changes

- `toEditMessage` and `toReturn` no longer accepts a MessageEmbed object. Instead, it accepts a object that matches with MessageEmbedLike interface.
- `toAddReaction` now receives two parameters: The reactions and the indentifier of the message where the reactions must be added.
  But it's optional.

## 🚀 Features

- Full rework of UI of the CLI (#362)
- Added timeout for `group` and `test` closures (#505)
- Created alias for `group` and `test` (`describe` and `it` respectively) (#493)
- Added timeout for hooks(`afterAll`, `beforeStart`, `afterEach`, `beforeEach`) (#590)
- Hooks executions are being done safely, so they do not breaks the application (#588)
- Add environment variables on corde execution (#577)
- Allowed `group` and `test` to receive any type as description (first parameter) (#492)
- Added stack trace for tests that fail (#566)
- Added `getRole` utility function for the api (#516)
- Added `createRole` utility function for the api (#517)

## 🐛 Bug Fixes

- Allow corde to accept tests with extensions different that \*.test (#595)
- Removed duplication of error display (#424)
- Fix timeout not being loaded (#589)
- Fix default value for tests timeout (#518)
- Fix bug in Queue that prevents async code to be waited (#529)

## 💡 Miscellaneous

- Renamed RoleData and MessageData to RoleIdentifier and MessageIdentifier (#583)
- Remove prettier for code identation provenient from init command, replaced it by a corde's self placed code (#574)

# 2.0.4

- update package.json to contain corde's site

# 2.0.3

- Bump dependencies version

# 2.0.2

- Fix corde execution

# 2.0.1

- Change README logo. (it has a logo with 2mb, and was replace for a logo with 10kb)

# 2.0.0

## Breaking changes: 😨

- Renamed `command` to `expect` and test functions witch has prefix `must`(mustReturn) now is
  `to` (toReturn) [#266](https://github.com/lucasgmagalhaes/corde/issues/266)

## Feature: 🚀

- Now is possible add `group` or `test` without add a name for then [#291](https://github.com/lucasgmagalhaes/corde/issues/291).
- Allowed users to define test files in CLI [#317](https://github.com/lucasgmagalhaes/corde/issues/317)
- Reviwed error messages [#302](https://github.com/lucasgmagalhaes/corde/issues/302)
- Created toRemoveReaction command [#318](https://github.com/lucasgmagalhaes/corde/issues/318)
- Created toSetRoleColor command [#271](https://github.com/lucasgmagalhaes/corde/issues/271)
- Created toDeleteRole command [#272](https://github.com/lucasgmagalhaes/corde/issues/272)
- Created toSetRoleHoist command [#273](https://github.com/lucasgmagalhaes/corde/issues/273)
- Created toSetRoleMentionable command [#270](https://github.com/lucasgmagalhaes/corde/issues/270)
- Created toRenameRole command [#269](https://github.com/lucasgmagalhaes/corde/issues/269)
- Created toSetRolePosition command [#267](https://github.com/lucasgmagalhaes/corde/issues/267)
- Created toSetRolePermissions command [#268](https://github.com/lucasgmagalhaes/corde/issues/268)
- Created afterEach function [#191](https://github.com/lucasgmagalhaes/corde/issues/191)
- Created beforeEach function [#265](https://github.com/lucasgmagalhaes/corde/issues/265)
- Created toPinMessage command [#243](https://github.com/lucasgmagalhaes/corde/issues/243)
- Created toUnpinMessage command [#244](https://github.com/lucasgmagalhaes/corde/issues/244)
- Add default export "corde" with all available functions [#482](https://github.com/lucasgmagalhaes/corde/issues/482)
- Allow send message of corde bot from API [#483](https://github.com/lucasgmagalhaes/corde/issues/483)
- Created toEditMessage command [#242](https://github.com/lucasgmagalhaes/corde/issues/242)

## Bug fix: 🐛

- Fix snipper bar [#324](https://github.com/lucasgmagalhaes/corde/issues/324)
- Expect.not setting command name as null [#341](https://github.com/lucasgmagalhaes/corde/issues/341)
- Corde does not execute [#421](https://github.com/lucasgmagalhaes/corde/issues/421)
- Rename config file from corde.** to corde.config.** [#429](https://github.com/lucasgmagalhaes/corde/issues/429)
- Add test directly to corde.group returns empty test file #497

## Chore:

- Add lin in CI [#277](https://github.com/lucasgmagalhaes/corde/issues/277)
- Rewrite tests structures [#274](https://github.com/lucasgmagalhaes/corde/issues/274)
- Create json schema for corde.config.json configs [#280](https://github.com/lucasgmagalhaes/corde/issues/280)
- Implement e2e tests [#478](https://github.com/lucasgmagalhaes/corde/issues/478), #484

# 2.0.0-beta.27

- Add wait time to toSetRoleMentionable function to avoid inconsistence

# 2.0.0-beta.10

- Hotfix tests executions

# 2.0.0-beta.9

- Hotfix for corde types

# 2.0.0-beta.8

- Hotfix for package usage

# 2.0.0-beta.7

- add beforeEach funtion

# 2.0.0-beta.6

- add afterEach function

# 2.0.0-beta.5

- Add toSetRolePermission function

# 2.0.0-beta.4

- Add: toSetRolePosition command test #363

# 1.0.1

## 🐛 Bug Fixes

- Fix API and README docs
- Pump dependencies version

# 1.0.0

## 🚀 Features

- Allow user to set config file in CLI [#194]
- Create validate command to check data of configs [#187]
- Create init command [#186]
- Allow use more than one type of config file [#182]
- Add command to init corde.json [#181]
- Add command to check corde version [#180]
- Migrate the CLI to commander [#179]
- Rewrite architeture [#174]

## 😨 Breaking changes

- Restrict corde to use node v12 or newer [#185]
- Rename functions "should" to "must" [#178]
- Create .not statement instead of a method for each deny function [#177]
- Rename configuration "testFilesDir" to "testFiles" and make it a array instead of plain string [#165]
- Create addsReaction command [#129]
- Create deep search for tests files [#129]

## 🐛 Bug Fixes

- Not full report is showing [#176]

# 0.2.3

- Fix logo path erro in README.md

# 0.2.2

## 🐛 Bug Fixes

- Removes the property `botFilePath` from configs due to not usage. Fixed not file folder error message when reading configs.
- Pumped libraries version.
