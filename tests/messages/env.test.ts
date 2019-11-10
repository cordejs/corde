import { command, afterLogin } from "../../lib/src/corde";
import it from "../../lib/src/corde";

afterLogin(async () => {
    await it("Should return hello", async () => {
        await command("hello").shouldRespond("hello!!");
    });
});