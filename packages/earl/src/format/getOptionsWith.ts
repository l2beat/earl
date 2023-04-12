import { FormatOptions } from './FormatOptions.js'

export function getOptionsWith(
  options: FormatOptions,
  updates: Partial<FormatOptions>,
) {
  let hasModifications = false
  for (const key of Object.keys(updates) as (keyof FormatOptions)[]) {
    if (options[key] !== updates[key]) {
      hasModifications = true
    }
  }
  if (hasModifications) {
    return { ...options, ...updates }
  }
  return options
}
