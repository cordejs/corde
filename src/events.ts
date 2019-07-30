import { concord, configs } from "./global";
import { runTests } from "./start";

concord.on("ready", () => {
    console.log(`${concord.user.username} is ready`);
});

// Correspond to the receptor of all messages sent by the users in Discord
concord.on("message", async msg => {
    // Ignoring user's message
    if (!msg.author.bot || msg.author.id !== configs.botTestId) return;
    // Checking if the command has the prefix
    else if (!msg.content.startsWith(configs.botPrefix, 0)) return;
    else if (msg.content === `${configs.botPrefix}runtests`) {
        runTests();
    }
});
