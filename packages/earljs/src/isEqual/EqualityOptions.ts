export interface EqualityOptions {
  /**
   * Considers two symbols with the same `toString` value equal, with the
   * exception of `Symbol('foo')` and `Symbol.for('foo')`
   */
  looseSymbolCompare: boolean
  /**
   * Considers two functions with the same `toString` value equal
   */
  looseFunctionCompare: boolean
  /**
   * Considers two NaN values unequal
   */
  uniqueNaNs: boolean
  /**
   * Considers +0 and -0 unequal
   */
  minusZero: boolean
  /**
   * Considers { x: 1, y: 1 } and { y: 1, x: 1 } unequal
   */
  strictObjectKeyOrder: boolean
}
