import prettyFormat from 'pretty-format'

import { AutofixType } from '../autofix'

export interface Control<T> {
  actual: T
  autofix: AutofixType
  isNegated: boolean
  assert: (result: ValidationResult) => void
}

export interface ValidationResult {
  success: boolean
  reason: string
  negatedReason: string
}

export function formatValue(value: any) {
  return prettyFormat(value, { min: true })
}
