import { Control } from '../Control'
import { ArrayWithMatcher, ContainerWithMatcher } from '../matchers'
import { ArrayOfLengthMatcher } from '../matchers/ArrayOfLength'
import { ObjectWithMatcher } from '../matchers/ObjectWith'
import { formatValue } from './common'

export function toBeAContainerWith(control: Control<any>, expectedItems: any[]) {
  const m = new ContainerWithMatcher(expectedItems)

  control.assert({
    success: m.check(control.actual),
    reason: `${formatValue(control.actual)} does not contain ${formatValue(expectedItems)}`,
    negatedReason: `${formatValue(control.actual)} contains ${formatValue(expectedItems)}`,
  })
}

export function toBeAnArrayOfLength(control: Control<ReadonlyArray<any>>, length: number) {
  const m = new ArrayOfLengthMatcher(length)

  control.assert({
    success: m.check(control.actual),
    reason: `${formatValue(control.actual)} does not have length ${formatValue(length)}`,
    negatedReason: `${formatValue(control.actual)} does have length ${formatValue(length)}`,
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

export function toBeAnObjectWith(control: Control<Object>, expected: Object) {
  const m = new ObjectWithMatcher(expected)

  control.assert({
    success: m.check(control.actual),
    reason: `${formatValue(control.actual)} is not a subset of object ${formatValue(expected)}`,
    negatedReason: `${formatValue(control.actual)} is a subset of object ${formatValue(expected)}`,
  })
}
