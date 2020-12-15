import { Control } from '../Control'
import { ContainerWithMatcher } from '../matchers'
import { formatValue } from './common'

export function toBeAContainerWith(control: Control<any>, expectedItems: any[]) {
  const m = new ContainerWithMatcher(expectedItems)

  control.assert({
    success: m.check(control.actual),
    reason: `${formatValue(control.actual)} does not contain ${formatValue(expectedItems)}`,
    negatedReason: `${formatValue(control.actual)} contains ${formatValue(expectedItems)}`,
  })
}
