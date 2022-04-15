import { MockProvider } from '@ethereum-waffle/provider'
import { expect } from 'earljs'
import { BigNumber } from 'ethers'

import { Events, Events__factory } from '../fixtures/generated'

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
    await expect(events.emitOne()).toEmit(events, 'One')
  })

  it('checks that event was not emitted', async () => {
    await expect(events.emitOne()).not.toEmit(events, 'Two')
  })

  it('checks args', async () => {
    await expect(events.emitOne()).toEmit(events, 'One', [BigNumber.from(1), 'One', expect.aHexString(64)])
    await expect(events.emitOne()).not.toEmit(events, 'One', [BigNumber.from(2), 'Two'])
  })
})
