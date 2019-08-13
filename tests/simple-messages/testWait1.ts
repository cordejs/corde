import test from "../../lib/operations/test";

test("should return Hello").run(
    {
        say: "hello",
        wait: "Hello!!"
    }
)