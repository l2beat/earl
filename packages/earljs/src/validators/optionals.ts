import { Control } from '../Control'

export function toBeDefined(control: Control<unknown>) {
  control.assert({
    success: control.actual != null,
    reason: `${control.actual} is not defined`,
    negatedReason: `${control.actual} is defined`,
  })
}

export function toBeNullish(control: Control<unknown>) {
  control.assert({
    success: control.actual == null,
    reason: `${control.actual} is not nullish`,
    negatedReason: `${control.actual} is nullish`,
  })
}
