import { BitFieldResolvable } from "../discordTypes";

/**
 * As we're encapsulating all Discord.js structures,
 * this one is not an exception. So this code is basically
 * the same found in Discord.js repository
 *
 * @see https://github.com/discordjs/discord.js/blob/master/src/util/BitField.js
 */
export class BitField<T extends string> {
  public bitfield: number;
  public static FLAGS: any = {};

  constructor(bits: BitFieldResolvable<T>) {
    this.bitfield = BitField.resolve(bits);
  }

  /**
   * Checks whether the bitfield has a bit, or any of multiple bits.
   *
   * @param bit Bit(s) to check for
   */
  any(bit: BitFieldResolvable<T>): boolean {
    return (this.bitfield & BitField.resolve(bit)) !== 0;
  }

  /**
   * Checks if this bitfield equals another
   *
   * @param bit Bit(s) to check for
   */
  equals(bit: BitFieldResolvable<T>): boolean {
    return this.bitfield === BitField.resolve(bit);
  }

  /**
   * Checks whether the bitfield has a bit, or multiple bits.
   *
   * @param bit Bit(s) to check for
   */
  has(bit: BitFieldResolvable<T>): boolean {
    if (Array.isArray(bit)) return bit.every((p) => this.has(p));
    bit = BitField.resolve(bit);
    return (this.bitfield & bit) === bit;
  }

  /**
   * Gets all given bits that are missing from the bitfield.
   *
   * @param bits Bit(s) to check for
   * @param hasParams Additional parameters for the has method, if any
   */
  missing(bits: BitFieldResolvable<T>): T[] {
    let bitsArray: string[] = [];
    if (!Array.isArray(bits)) {
      bitsArray = new BitField(bits).toArray();
    }
    return bitsArray.filter((p) => !this.has(<T>p)) as T[];
  }

  /**
   * Freezes these bits, making them immutable.
   */
  freeze(): Readonly<BitField<T>> {
    return Object.freeze(this);
  }

  /**
   * Adds bits to these ones.
   *
   * @param bits Bits to add
   */
  add(...bits: BitFieldResolvable<T>[]): BitField<T> {
    let total = 0;
    for (const bit of bits) {
      total |= BitField.resolve(bit);
    }
    if (Object.isFrozen(this)) {
      return new BitField<T>(this.bitfield | total);
    }
    this.bitfield |= total;
    return this;
  }

  /**
   * Removes bits from these.
   *
   * @param [bits] Bits to remove
   */
  remove(...bits: BitFieldResolvable<T>[]): BitField<T> {
    let total = 0;
    for (const bit of bits) {
      total |= BitField.resolve(bit);
    }
    if (Object.isFrozen(this)) {
      return new BitField<T>(this.bitfield & ~total);
    }
    this.bitfield &= ~total;
    return this;
  }

  /**
   * Gets an object mapping field names to a `boolean` indicating whether the
   * bit is available.
   *
   * @param hasParams Additional parameters for the has method, if any
   */
  serialize(): Record<T, boolean> {
    const serialized: any = {};
    for (const [flag, bit] of Object.entries(BitField.FLAGS)) serialized[flag] = this.has(<T>bit);
    return serialized;
  }

  /**
   * Gets an array of bitfield names based on the bits available.
   * @param hasParams Additional parameters for the has method, if any
   */
  toArray(): T[] {
    return Object.keys(BitField.FLAGS).filter((bit) => this.has(<T>bit)) as T[];
  }

  *[Symbol.iterator]() {
    yield* this.toArray();
  }

  toJSON(): number {
    return this.bitfield;
  }

  valueOf(): number {
    return this.bitfield;
  }

  /**
   * Resolves bitfields to their numeric form.
   * @param bit to resolve
   */
  static resolve(bit: BitFieldResolvable<any> = 0): number {
    if (typeof bit === "number" && bit >= 0) return bit;
    if (bit instanceof BitField) return bit.bitfield;
    if (Array.isArray(bit)) return bit.map((p) => this.resolve(p)).reduce((prev, p) => prev | p, 0);
    if (typeof bit === "string" && typeof BitField.FLAGS[bit] !== "undefined")
      return BitField.FLAGS[bit];
    throw new RangeError("BITFIELD_INVALID");
  }
}
