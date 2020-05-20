import { Mock } from '../mocks/common'
import { Control } from './common'

export function toBeExhausted(control: Control<Mock>) {
  return control.assert({
    success: control.actual.isExhausted(),
    reason: 'Mock not exhausted!',
    negatedReason: 'Mock exhausted!',
  })
}
