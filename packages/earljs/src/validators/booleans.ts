import { Control } from '../Control'

export function toBeTruthy(control: Control<unknown>) {
  control.assert({
    success: Boolean(control.actual),
    reason: `${control.actual} is not truthy`,
    negatedReason: `${control.actual} is truthy`,
  })
}

export function toBeFalsy(control: Control<unknown>) {
  control.assert({
    success: !control.actual,
    reason: `${control.actual} is not falsy`,
    negatedReason: `${control.actual} is falsy`,
  })
}
