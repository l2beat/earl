import { format } from './format'
import { FormatOptions } from './FormatOptions'

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
}

export function formatCompact(value: unknown): string {
  return format(value, null, FORMAT_OPTIONS)
}
