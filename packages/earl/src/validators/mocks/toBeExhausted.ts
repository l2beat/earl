import { Mock } from '../../mocks'
import { Control } from '../common'

export function toBeExhausted(control: Control<Mock<any, any>>) {
  return control.assert({
    success: control.actual.isExhausted(),
    reason: 'Mock not exhausted!',
    negatedReason: 'Mock exhausted!',
  })
}
