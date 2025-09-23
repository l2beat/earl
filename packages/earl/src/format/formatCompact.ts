import type { FormatOptions } from './FormatOptions.js'
import { format } from './format.js'

const FORMAT_OPTIONS: FormatOptions = {
  compareErrorStack: false,
  ignorePrototypes: false,
  minusZero: false,
  uniqueNaNs: false,
  indentSize: 0,
  inline: true,
  maxLineLength: 30,
  skipMatcherReplacement: true,
  requireStrictEquality: false,
  splitMultilineStrings: false,
}

export function formatCompact(value: unknown, maxLineLength?: number): string {
  return format(value, null, {
    ...FORMAT_OPTIONS,
    maxLineLength: maxLineLength ?? FORMAT_OPTIONS.maxLineLength,
  })
}
