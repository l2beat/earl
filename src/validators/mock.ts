import { StrictMock } from '../mocks/strictMock'
import { Control } from './common'

export function toBeExhausted(control: Control<StrictMock<any, any>>) {
  control.assert({
    success: control.actual.isExhausted(),
    reason: 'Mock not exhausted!',
    negatedReason: 'Mock exhausted!',
  })
}
