export function isPrimitiveValue(value: unknown): value is string | boolean | number {
  return (
    typeof value === "number" ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  );
}
