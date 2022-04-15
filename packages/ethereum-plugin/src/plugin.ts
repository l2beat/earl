import { createPlugin } from 'earljs/internals'

import { HexStringMatcher } from './matchers/aHexString'
import { AddressMatcher } from './matchers/anAddress'
import { NonChecksumAddressMatcher } from './matchers/aNonChecksumAddress'
import { PrivateKeyMatcher } from './matchers/aPrivateKey'
import { bigNumberChecksItsEquality } from './smartEqRules/bigNumberChecksItsEquality'
import { toBeAHexString } from './validators/toBeAHexString'
import { toBeAnAddress } from './validators/toBeAnAddress'
import { toBeANonChecksumAddress } from './validators/toBeANonChecksumAddress'
import { toBeAPrivateKey } from './validators/toBeAPrivateKey'
import { toEmit } from './validators/toEmit'

export const plugin = createPlugin({
  matchers: {
    aHexString: HexStringMatcher.make,
    anAddress: AddressMatcher.make,
    aNonChecksumAddress: NonChecksumAddressMatcher.make,
    aPrivateKey: PrivateKeyMatcher.make,
  },
  smartEqRules: {
    bigNumberChecksItsEquality,
  },
  validators: {
    toBeAHexString,
    toBeAnAddress,
    toBeANonChecksumAddress,
    toBeAPrivateKey,
    toEmit,
  },
})
