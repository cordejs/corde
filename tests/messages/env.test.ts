import it, { expect, env } from "../../lib/src/corde";

env(async () => {
    await it("should return Hello", async () => {
         await expect("hello").toBe("hello!!");
         await expect("hey").toBe("hey!!");
    });
});

