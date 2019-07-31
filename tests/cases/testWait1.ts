import test from "../../src/operations/test"

test("should return Hello").run(
    {
        say: "hello",
        wait: "Hello you!"
    }
)