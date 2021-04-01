## Instaling

- clone the repo: **git clone https://github.com/lucasgmagalhaes/corde.git**
- install all dependencies with: `yarn install`
- create a link for the project to make it easy to test: **npm link**
- in the root of the project, there is a `.env.example` file. Rename it to `.env` and put all configuration needed to run the project.

## How to Commit

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) to padronize our commits

These are all common types used:

- **fix**: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
- **feat**: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
- **BREAKING CHANGE**: a commit that has a footer BREAKING CHANGE: or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of commits of any type
- **build**: Something related to how the project builds.
- **chore**: Some trivial changes that do not impact anything in the project or its docs.
- **ci**: Specific to continuous integration build.
- **docs**: a commit that change corde docs.
- **refactor**: a commit that refactors some code.
- **test**: a commit that adds, change or remove something in tests.
