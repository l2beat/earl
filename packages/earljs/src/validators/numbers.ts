import { Control } from '../Control'
import { formatCompact } from '../format'

export function toBeGreaterThan(control: Control<number>, target: number) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)
  control.assert({
    success: control.actual > target,
    reason: `${actualFmt} is not greater than ${targetFmt}`,
    negatedReason: `${actualFmt} is greater than ${targetFmt}`,
  })
}

export function toBeGreaterThanOrEqualTo(
  control: Control<number>,
  target: number,
) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)

  control.assert({
    success: control.actual >= target,
    reason: `${actualFmt} is not greater than or equal to ${targetFmt}`,
    negatedReason: `${actualFmt} is greater than or equal to ${targetFmt}`,
  })
}

export function toBeLessThan(control: Control<number>, target: number) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)
  control.assert({
    success: control.actual < target,
    reason: `${actualFmt} is not less than ${targetFmt}`,
    negatedReason: `${actualFmt} is less than ${targetFmt}`,
  })
}

export function toBeLessThanOrEqualTo(
  control: Control<number>,
  target: number,
) {
  const actualFmt = formatCompact(control.actual)
  const targetFmt = formatCompact(target)
  control.assert({
    success: control.actual <= target,
    reason: `${actualFmt} is not less than or equal to ${targetFmt}`,
    negatedReason: `${actualFmt} is less than or equal to ${targetFmt}`,
  })
}
