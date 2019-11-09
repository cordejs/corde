import { command, afterLogin } from "../../lib/src/corde";
import { default as cordIt } from "../../lib/src/corde";

afterLogin(async () => {
    await cordIt("Should return hello", async () => {
        await command("hello").shouldRespond("hello!!");
        await command("hello").shouldRespond("hello!!");
    });
});