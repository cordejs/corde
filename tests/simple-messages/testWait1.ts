import test from "../../lib/operations/test";

test("should return Hello").then(obj => {
    obj.run(
        {
            say: "hello",
            wait: "Hello!!"
        }
    )
});
