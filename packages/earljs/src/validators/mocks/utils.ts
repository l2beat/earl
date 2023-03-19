import { Control } from '../../Control'
import { formatCompact } from '../../format'
import { isMock, Mock } from '../../mocks'

export function assertIsMock(
  control: Control<unknown>,
): asserts control is Control<Mock<any[], any>> {
  if (!isMock(control.actual)) {
    const actualInline = formatCompact(control.actual)
    return control.fail({
      reason: `The value ${actualInline} is not a mock function, but it was expected to be a mock function.`,
    })
  }
}
