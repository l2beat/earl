import { DEFAULT_EQUALITY_OPTIONS, EqualityOptions, LOOSE_EQUALITY_OPTIONS } from '../isEqual'

export interface FormatOptions extends EqualityOptions {
  /**
   * Number of spaces added for each indentation level
   */
  indentSize: number
  /**
   * Format inline instead of using indentation
   */
  inline: boolean
  /**
   * Never replaces matcher with matched contents
   */
  skipMatcherReplacement: boolean
  /**
   * Mark top-level objects that aren't strictly equal as different
   */
  requireStrictEquality: boolean
}

export const DEFAULT_FORMAT_OPTIONS: FormatOptions = {
  ...DEFAULT_EQUALITY_OPTIONS,
  indentSize: 2,
  inline: false,
  skipMatcherReplacement: false,
  requireStrictEquality: false,
}

export const LOOSE_FORMAT_OPTIONS = {
  ...DEFAULT_FORMAT_OPTIONS,
  ...LOOSE_EQUALITY_OPTIONS,
}
