import it, { expect, env } from "../../lib/src/corde";

env(async () => {
    it("should return Hello", async () => {
         expect("hello").toBe("hello!!").then(() => {
            expect("hey").toBe("hey!!");
        });
    });
});

