import { SmartEqRule } from 'earljs/internals'
import { BigNumber, BigNumberish } from 'ethers'

/**
 * If we expect `1` or `"1"`, receiving `BigNumber.from(1)` is also fine.
 *
 * We outsource the equality check to `BigNumber.prototype.eq`
 *
 * @example
 * expect(BigNumber.from(1)).toEqual(1)
 * expect(BigNumber.from(1)).toEqual("1")
 * expect(BigNumber.from(1)).toEqual(1n)
 */
export const bigNumberChecksItsEquality: SmartEqRule<BigNumber, BigNumberish> = (actual, expected) => {
  if (BigNumber.isBigNumber(actual)) {
    if (actual.eq(expected)) return { result: 'success' }
  }
}
