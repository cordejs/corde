import { logout } from "./bot";

async function processError(error: Error | {}) {
  console.error(error);
  await logout();
  process.exit(1);
}

process.on("uncaughtException", async function(error) {
  await processError(error);
});

process.on("unhandledRejection", async function(error) {
  await processError(error);
});
