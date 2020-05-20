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
