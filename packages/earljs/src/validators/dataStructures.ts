import { Control } from '../Control'
import { ArrayWithMatcher, ContainerWithMatcher } from '../matchers'
import { formatValue } from './common'

export function toBeAContainerWith(control: Control<any>, expectedItems: any[]) {
  const m = new ContainerWithMatcher(expectedItems)

  control.assert({
    success: m.check(control.actual),
    reason: `${formatValue(control.actual)} does not contain ${formatValue(expectedItems)}`,
    negatedReason: `${formatValue(control.actual)} contains ${formatValue(expectedItems)}`,
  })
}

export function toBeAnArrayWith(control: Control<ReadonlyArray<any>>, expectedItems: ReadonlyArray<any>) {
  const m = new ArrayWithMatcher(expectedItems)

  control.assert({
    success: m.check(control.actual),
    reason: `${formatValue(control.actual)} does not contain array ${formatValue(expectedItems)}`,
    negatedReason: `${formatValue(control.actual)} contains array ${formatValue(expectedItems)}`,
  })
}
