export interface EqualityOptions {
  /**
   * Considers two NaN values unequal
   */
  uniqueNaNs: boolean
  /**
   * Considers +0 and -0 unequal
   */
  minusZero: boolean
}
