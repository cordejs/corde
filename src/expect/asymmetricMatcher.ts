import { typeOf } from "../utils";

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

  matchType(classType: any) {
    return (
      this._classType === undefined ||
      this._classType === null ||
      this._classType.length === 0 ||
      this._classType.some((type) => classType === type)
    );
  }

  matchValue(value: any) {
    return this._classType.every((classType) => this._isValueOfType(classType, value));
  }

  private _isValueOfType(classType: any, value: any) {
    if (classType === Number) {
      return typeOf(value) === "number";
    }

    if (classType === BigInt) {
      return typeOf(value) === "bigint";
    }

    if (classType === String) {
      return typeOf(value) === "string";
    }

    if (classType === Boolean) {
      return typeOf(value) === "boolean";
    }

    if (classType === Array) {
      return typeOf(value) === "array";
    }

    if (classType === Object) {
      return typeOf(value) === "object";
    }

    if (classType === Function) {
      return typeOf(value) === "function";
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
