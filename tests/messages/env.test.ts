import { command, afterLogin, handler, it } from "../../lib/src/runtime";
import { commandHandler } from "../bot";

afterLogin(async () => {
    handler(commandHandler);
    await it("Should return hello", async () => {
        await command("hello").shouldRespond("hello!!");
    });

    await it("Should return hey", async () => {
        await command("hey").shouldRespond("hey!!");
    });

    await it("Should faill because command is ''", async () => {
        await command("").shouldRespond("hey!!");
    });
});
