# Discord Auto message sender

Automate discord messages sending without the use of a discord bot. It uses the `puppeteer` and the `CDP` protocol from chromium.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have chrome/chromium browser installed. Works on Windows/Linux/MacOS
You will need nodejs and npm installed.

### Installing

#### Run chrome/chromium with remote debugging ON

`NOTE that if an instance of chrome is already running on your system, remote debugging port won't work`

I advise you to create a hidden folder `.discord_project` so it can be used to store your user data.

```console
foo@foobar:~$ mkdir ~/.discord_project
foo@foobar:~$ chromium --remote-debugging-port=1337 --user-data-dir=~/.discord_project
```

now create a `.env` file using the example `.env.example`

```console
foo@foobar:~$ cp .env.example .env
```

Now edit the .env file with your `discord credentials` and the set the `SERVER_NAME` variable.

```shell
DISCORD_USER="your_username"
DISCORD_PASSWORD="your_discord_password"

SERVER_NAME="ShellmatesTeam2020"

```

Install dependencies using npm

```properties
npm install
```

## Deployment

run the script and let it do the work.

```properties
node index.js
```

## Built With

- [NodeJS](https://nodejs.org/) - Language used
- [npm](https://www.npmjs.com/) - Dependency Management
- [puppeteer](https://pptr.dev/) - Headless Chrome Node.js API

## Authors

- **CHERIEF Yassine** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- CHERIEF Yassine
