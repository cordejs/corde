## Instaling

- clone the repo: **git clone https://github.com/cordejs/corde.git**
- install all dependencies with: `yarn install`
- create a link for the project to make it easy to test: **npm link**
- in the root of the project, there is a `.env.example` file. Rename it to `.env` and put all configuration needed to run the project.

## How to Commit

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) to padronize our commits

These are all common types used:

- **fix**: a commit of the type fix patches a bug in the codebase. (creates a MINOR version)
- **feat**: a commit of the type feat patches a new tool or utility to be used by clients. (creates a PATCH version)
- **BREAKING CHANGE**: Represents a commit that will make usage of some features of the library broken in next version (MAJOR version)
- **build**: Something related to how the project builds.
- **chore**: Some trivial changes that do not impact anything in the project or its docs.
- **ci**: Specific to continuous integration build.
- **docs**: a commit that change corde docs.
- **refact**: a commit that refactors some code.
- **test**: a commit that adds, change or remove something in tests.
