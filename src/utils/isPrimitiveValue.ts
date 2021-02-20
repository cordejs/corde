import { Primitive } from "../types";

/**
 * Check if a value is a primitive type.
 * @param value Value to assert type.
 * @internal
 */
export function isPrimitiveValue(value: unknown): value is Primitive {
  return (
    typeof value === "number" ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  );
}
