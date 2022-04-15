import { expect } from 'earljs'
import { BigNumber } from 'ethers'
import fc from 'fast-check'

import { bigNumberChecksItsEquality } from '../../src/smartEqRules/bigNumberChecksItsEquality'

describe(bigNumberChecksItsEquality.name, () => {
  describe('given an actual BigNumber', () => {
    it('equals a BigNumberish of the same value', () => {
      fc.assert(
        fc.property(fc.oneof(fc.float({ min: 1 }), fc.integer()), (value) => {
          const actual = BigNumber.from(value)

          // BigNumber == BigNumber
          expect(actual).toEqual(actual)
          // BigNumber == number
          expect(actual).toEqual(value)
          // BigNumber == string
          expect(actual).toEqual(`${value}`)
          // BigNumber == bigint
          expect(actual).toEqual(BigInt(value))
        }),
      )
    })
  })
})
