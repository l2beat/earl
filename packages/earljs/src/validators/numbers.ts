import { Control } from '../Control'

export function toBeGreaterThan(control: Control<number>, target: number) {
  control.assert({
    success: control.actual > target,
    reason: `${control.actual} is not greater than ${target}`,
    negatedReason: `${control.actual} is greater than ${target}`,
  })
}

export function toBeGreaterThanOrEqualTo(control: Control<number>, target: number) {
  control.assert({
    success: control.actual >= target,
    reason: `${control.actual} is not greater than or equal to ${target}`,
    negatedReason: `${control.actual} is greater than or equal to ${target}`,
  })
}

export function toBeLessThan(control: Control<number>, target: number) {
  control.assert({
    success: control.actual < target,
    reason: `${control.actual} is not less than ${target}`,
    negatedReason: `${control.actual} is less than ${target}`,
  })
}

export function toBeLessThanOrEqualTo(control: Control<number>, target: number) {
  control.assert({
    success: control.actual <= target,
    reason: `${control.actual} is not less than or equal to ${target}`,
    negatedReason: `${control.actual} is less than or equal to ${target}`,
  })
}
