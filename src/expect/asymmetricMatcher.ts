import { typeOf } from "../utils/typeOf";

export class AsymmetricMatcher {
  private _classType: any[];

  constructor(...classType: any[]) {
    this._classType = classType;
  }

  isSpecified() {
    return this._classType.length > 0;
  }

  toString() {
    if (this.isSpecified()) {
      const names = this._classType.map((type) => this.getTypeName(type));
      return `any(${names.join(", ")})`;
    }
    return "any";
  }

  getTypeName(classType: any) {
    if (classType === Number) {
      return "Number";
    }

    if (classType === Date) {
      return "Date";
    }

    if (classType === BigInt) {
      return "Bigint";
    }

    if (classType === String) {
      return "String";
    }

    if (classType === Boolean) {
      return "Boolean";
    }

    if (classType === Array) {
      return "Array";
    }

    if (classType === Object) {
      return "Object";
    }

    if (classType === Function) {
      return "Function";
    }

    if (classType === Symbol) {
      return "Symbol";
    }

    if (typeof classType === "function") {
      return classType.name;
    }

    return classType;
  }

  getTypes() {
    return this._classType;
  }

  matchType(...classType: any[]) {
    return (
      this._classType === undefined ||
      this._classType === null ||
      this._classType.length === 0 ||
      classType.length === 0 ||
      this._classType.some((type) => classType.includes(type))
    );
  }

  matchValue(value: any) {
    return (
      this.isSpecified() ||
      this._classType.every((classType) => this._isValueOfType(classType, value))
    );
  }

  private _isValueOfType(classType: any, value: any) {
    if (classType === Number) {
      return typeOf(value) === "number" || value instanceof Number;
    }

    if (classType === BigInt) {
      return typeOf(value) === "bigint" || value instanceof BigInt;
    }

    if (classType === String) {
      return typeOf(value) === "string" || value instanceof String;
    }

    if (classType === Boolean) {
      return typeOf(value) === "boolean" || value instanceof Boolean;
    }

    if (classType === Array) {
      return typeOf(value) === "array";
    }

    if (classType === Object) {
      return typeOf(value) === "object";
    }

    if (classType === Function) {
      return typeOf(value) === "function" || value instanceof Function;
    }

    if (classType === Symbol) {
      return typeOf(value) === "symbol";
    }

    if (typeOf(value) === "object") {
      return value instanceof classType;
    }

    return false;
  }
}

export function any(...classType: any[]) {
  return new AsymmetricMatcher(...classType);
}
