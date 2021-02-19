import { Primitive } from "../types";

export function isPrimitiveValue(value: unknown): value is Primitive {
  return (
    typeof value === "number" ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  );
}
