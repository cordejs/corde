const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  discord_password: process.env.DISCORD_PASSWORD,
  discord_user: process.env.DISCORD_USER,
  server_name: process.env.SERVER_NAME,
};
