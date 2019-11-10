import { command, afterLogin, handler } from "../../lib/src/corde";
import it from "../../lib/src/corde";
import { commandHandler } from "../bot";

afterLogin(async () => {
    handler(commandHandler);
    await it("Should return hello", async () => {
        await command("hello").shouldRespond("hello!!");
    });
});