import { PluginSmartEqRules, SmartEqRule } from '../plugins/types'
import { NonEmptyOnly } from '../types'

type ErrorReasons = 'value mismatch' | 'prototype mismatch' | 'object possibly infinite'
export type SmartEqResult = { result: 'success' } | { result: 'error'; reason: ErrorReasons }

export function buildSmartEqResult(success: boolean, reason: ErrorReasons = 'value mismatch'): SmartEqResult {
  if (success) {
    return { result: 'success' }
  } else {
    return { result: 'error', reason }
  }
}

export const smartEqRules: SmartEqRule<unknown, unknown>[] = []

export function loadSmartEqRules(rules: PluginSmartEqRules<never>): void {
  const rulesArray: SmartEqRule<unknown, unknown>[] = Array.isArray(rules) ? rules : Object.values(rules)
  smartEqRules.push(...rulesArray)
}

export function clearSmartEqRules() {
  smartEqRules.length = 0
}

export interface SmartEqRules {}

export declare namespace SmartEqRules {
  export type Expected<TEqRule> = TEqRule extends SmartEqRule<any, infer TExpected> ? TExpected : never
}

export type ExpectedEqual<TActual> =
  | TActual
  | SmartEqRules.Expected<Extract<SmartEqRules[keyof SmartEqRules], SmartEqRule<TActual, never>>>
  | NonEmptyOnly<TActual extends object ? { [K in keyof TActual]: ExpectedEqual<TActual[K]> } : never>
