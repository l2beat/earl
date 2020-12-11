import { Control } from '../../Control'
import { Mock } from '../../mocks'

export function toBeExhausted(control: Control<Mock<any, any>>) {
  return control.assert({
    success: control.actual.isExhausted(),
    reason: 'Mock not exhausted!',
    negatedReason: 'Mock exhausted!',
  })
}
