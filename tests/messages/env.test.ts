import it, { expect, cases } from "../../lib/src/corde";

cases(async () => {
    await it("should return Hello", async () => {
         await expect("hello").toBe("hello!!");
         await expect("hey").toBe("hey!!");
    });
});

