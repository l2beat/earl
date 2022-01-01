export interface EqualityOptions {
  /**
   * Considers two symbols with the same `toString` value equal
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
}
