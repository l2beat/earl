import { EqualityOptions } from '../isEqual'

export interface FormatOptions extends EqualityOptions {
  /**
   * Number of spaces added for each indentation level
   */
  indentSize: number
  /**
   * Format inline instead of using indentation
   */
  inline: boolean
}
