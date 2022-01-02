import { Control } from '../Control'
import { formatCompact } from '../format'

export function toBeTruthy(control: Control<unknown>) {
  const fmt = formatCompact(control.actual)
  control.assert({
    success: Boolean(control.actual),
    reason: `${fmt} is not truthy`,
    negatedReason: `${fmt} is truthy`,
  })
}

export function toBeFalsy(control: Control<unknown>) {
  const fmt = formatCompact(control.actual)
  control.assert({
    success: !control.actual,
    reason: `${fmt} is not falsy`,
    negatedReason: `${fmt} is falsy`,
  })
}
