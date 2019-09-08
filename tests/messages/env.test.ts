import it, { command, cases } from "../../lib/src/corde";

cases(async () => {
    await it("should return Hello", async () => {
         await command("hello").shouldRespond("hello!!");
         await command("hey").shouldRespond("hey!!");
    });
});

