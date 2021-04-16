// Set the varibles for development environment
require("dotenv").config();

export const superSecretDiscordToken = {
  token: process.env.DISCORD_TOKEN,
};

export const dbConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const projectVersion = require("./package.json").version;
