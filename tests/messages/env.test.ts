import { describe } from "mocha";
import { command, afterLogin } from "../../lib/src/corde";
import { expect } from "chai";
import { default as cordIt } from "../../lib/src/corde";

async function testShouldResponse(commandName: string, response: string) {
    return new Promise(async (resolve) => {
        afterLogin(async () => {
            await cordIt("should return Hello", async () => {
                const result = await command(commandName).shouldRespond(response);
                resolve(result);
            });
        }, true);
    });
}

describe("command hello return true", () => {
    it("Should return hello", function (done) {
        testShouldResponse("hello", "hello!!").then(response => {
            expect(response).equal(true);
            done();
        });
    });
});

describe("command hello return true", async () => {
    it("Should return hello", () => {
        testShouldResponse("hello", "hello!!").then(response => {
            expect(response).equal(true);
        });
    });
});