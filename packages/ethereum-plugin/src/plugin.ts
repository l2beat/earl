import { createPlugin } from 'earljs/internals'

import { HexStringMatcher } from './matchers/aHexString'
import { AddressMatcher } from './matchers/anAddress'
import { PrivateKeyMatcher } from './matchers/aPrivateKey'
import { toBeAHexString } from './validiators/toBeAHexString'
import { toBeAnAddress } from './validiators/toBeAnAddress'
import { toBeAPrivateKey } from './validiators/toBeAPrivateKey'
import { toEmit } from './validiators/toEmit'

export const plugin = createPlugin({
  matchers: {
    aHexString: HexStringMatcher.make,
    anAddress: AddressMatcher.make,
    aPrivateKey: PrivateKeyMatcher.make,
  },
  validators: {
    toBeAHexString,
    toBeAnAddress,
    toBeAPrivateKey,
    toEmit,
  },
})
