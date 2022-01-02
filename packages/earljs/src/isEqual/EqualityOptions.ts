export interface EqualityOptions {
  /**
   * Considers two NaN values unequal
   */
  uniqueNaNs: boolean
  /**
   * Considers +0 and -0 unequal
   */
  minusZero: boolean
  /**
   * Considers new Vector2(1, 2) and { x: 1, y: 2 } equal
   */
  ignorePrototypes: boolean
  /**
   * Compares the stack property of Error instances
   */
  compareErrorStack: boolean
}
