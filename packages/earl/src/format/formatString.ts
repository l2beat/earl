import { FormatOptions } from './FormatOptions'

export function formatString(value: string, options: FormatOptions) {
  if (options.inline && value.length > options.maxLineLength - 2) {
    return JSON.stringify(value.slice(0, 7) + '...')
  }
  return JSON.stringify(value)
}
