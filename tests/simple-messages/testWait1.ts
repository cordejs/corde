import test from "../../lib/src/operations/test";

test("should return Hello").then(obj => {
    obj.run(
        {
            say: "hello",
            wait: "Hello!!"
        }
    )
});
