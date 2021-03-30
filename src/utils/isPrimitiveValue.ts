/**
 * Check if a value is a primitive type.
 * @param value Value to assert type.
 * @internal
 */
export function isPrimitiveValue(value: unknown): value is string | number | bigint | boolean {
  return (
    typeof value === "number" ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  );
}
