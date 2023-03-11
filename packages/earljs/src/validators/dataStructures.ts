import { Control } from '../Control'
import { formatCompact } from '../format'
import { ArrayWithMatcher, ContainerWithMatcher } from '../matchers'
import { ArrayOfLengthMatcher } from '../matchers/ArrayOfLength'
import { ObjectWithMatcher } from '../matchers/ObjectWith'

export function toBeAContainerWith(control: Control<any>, expectedItems: any[]) {
  const m = new ContainerWithMatcher(expectedItems)

  const actualFmt = formatCompact(control.actual)
  const expectedFmt = formatCompact(expectedItems)

  control.assert({
    success: m.check(control.actual),
    reason: `${actualFmt} does not contain ${expectedFmt}`,
    negatedReason: `${actualFmt} contains ${expectedFmt}`,
  })
}

export function toBeAnArrayOfLength(control: Control<readonly any[]>, length: number) {
  const m = new ArrayOfLengthMatcher(length)

  const actualFmt = formatCompact(control.actual)
  const lengthFmt = formatCompact(length)

  control.assert({
    success: m.check(control.actual),
    reason: `${actualFmt} does not have length ${lengthFmt}`,
    negatedReason: `${actualFmt} does have length ${lengthFmt}`,
  })
}

export function toBeAnArrayWith(control: Control<readonly any[]>, expectedItems: readonly any[]) {
  const m = new ArrayWithMatcher(expectedItems)

  const actualFmt = formatCompact(control.actual)
  const expectedFmt = formatCompact(expectedItems)

  control.assert({
    success: m.check(control.actual),
    reason: `${actualFmt} does not contain array ${expectedFmt}`,
    negatedReason: `${actualFmt} contains array ${expectedFmt}`,
  })
}

export function toBeAnObjectWith(control: Control<object>, expected: object) {
  const m = new ObjectWithMatcher(expected)

  const actualFmt = formatCompact(control.actual)
  const expectedFmt = formatCompact(expected)

  control.assert({
    success: m.check(control.actual),
    reason: `${actualFmt} is not a subset of object ${expectedFmt}`,
    negatedReason: `${actualFmt} is a subset of object ${expectedFmt}`,
  })
}
