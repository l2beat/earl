import { Control } from '../Control'
import { formatCompact } from '../format'

export function toBeDefined(control: Control<unknown>) {
  const actualFmt = formatCompact(control.actual)
  control.assert({
    success: control.actual != null,
    reason: `${actualFmt} is not defined`,
    negatedReason: `${actualFmt} is defined`,
  })
}

export function toBeNullish(control: Control<unknown>) {
  const actualFmt = formatCompact(control.actual)
  control.assert({
    success: control.actual == null,
    reason: `${actualFmt} is not nullish`,
    negatedReason: `${actualFmt} is nullish`,
  })
}
