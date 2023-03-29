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

export const DEFAULT_EQUALITY_OPTIONS: EqualityOptions = {
  uniqueNaNs: false,
  minusZero: false,
  ignorePrototypes: false,
  compareErrorStack: false,
}

export const LOOSE_EQUALITY_OPTIONS: EqualityOptions = {
  ...DEFAULT_EQUALITY_OPTIONS,
  ignorePrototypes: true,
}
