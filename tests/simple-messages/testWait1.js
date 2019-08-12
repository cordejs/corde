import test from "../../lib/src/operations/test";

test("should return Hello").run(
    {
        say: "hello",
        wait: "Hello!!"
    }
)