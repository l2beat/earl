import { MockProvider } from '@ethereum-waffle/provider'
import { expect } from 'earljs'
import { BigNumber } from 'ethers'

import { Events, Events__factory } from '../fixtures/generated'
import { TypedEventFilter } from '../fixtures/generated/common'

// #region @krzkaczor is this what you meant?

type __EventsEventNames = keyof Events['filters']
type __EventsEventArgs = {
  [P in __EventsEventNames]: ReturnType<Events['filters'][P]> extends TypedEventFilter<infer T> ? T['args'] : never
}

type StringKeys<T extends object> = { [P in keyof T as P extends `${number}` | number ? never : P]: T[P] }

type __EventsEventArgsObjects = {
  [P in keyof __EventsEventArgs]: StringKeys<Omit<__EventsEventArgs[P], keyof unknown[]>>
}

// HOVER HERE
type __OneEventObject = __EventsEventArgsObjects['One']

type NumberKeys<T extends any[]> = { [I in keyof T as I extends `${number}` ? I : never]: T[I] }

// prettier-ignore
type NumberDictAsTuple<T extends Record<number, unknown>> = 
  unknown extends T[1] ? T[0] :
  unknown extends T[2] ? [T[0], T[1]] :
  unknown extends T[3] ? [T[0], T[1], T[2]] :
  unknown extends T[4] ? [T[0], T[1], T[2], T[3]] :
  unknown extends T[5] ? [T[0], T[1], T[2], T[3], T[4]] :
  unknown extends T[6] ? [T[0], T[1], T[2], T[3], T[4], T[5]] :
  unknown extends T[7] ? [T[0], T[1], T[2], T[3], T[4], T[5], T[6]] :
  unknown extends T[8] ? [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7]] :
  unknown extends T[9] ? [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8]] :
  [T[0], T[1], T[2], T[3], T[4], T[5], T[6], T[7], T[8], T[9]]

type __EventsEventArgArrays = {
  [P in keyof __EventsEventArgs]: NumberDictAsTuple<NumberKeys<__EventsEventArgs[P]>>
}

// AND HOVER HERE TOO
type __OneEventArray = __EventsEventArgArrays['One']

// #region @krzkaczor

describe('toEmit', function () {
  this.timeout(10000)

  let events: Events

  before(async function () {
    this.timeout(10000)
    const provider = new MockProvider()
    const [wallet] = provider.getWallets()
    // We're setting `process.env.NODE_OPTIONS` to `--openssl-legacy-provider`
    // just for this test.
    events = await new Events__factory(wallet).deploy()
  })

  it('checks that event was emitted', async () => {
    await expect(events.emitOne()).toEmit2(events, 'One')
  })

  it('checks that event was not emitted', async () => {
    await expect(events.emitOne()).not.toEmit(events, 'Two')
  })

  it('checks args', async () => {
    await expect(events.emitOne()).toEmit(events, 'One', [BigNumber.from(1), 'One', expect.aHexString(64)])
    await expect(events.emitOne()).not.toEmit(events, 'One', [BigNumber.from(2), 'Two'])
  })
})
