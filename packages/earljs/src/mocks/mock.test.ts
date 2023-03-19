import { expect } from 'chai'

import { mock } from './mock'
import { isMock } from './mockFn'

describe(mock.name, () => {
  class Jogger {
    name = 'A'
    run() {
      return 1
    }
  }

  it('can mock a class', () => {
    const instance = mock<Jogger>({
      name: 'B',
      run: () => 10,
    })

    expect(instance.name).to.equal('B')
    expect(instance.run()).to.equal(10)

    expect(isMock(instance.run)).to.equal(true)
  })

  it('can reconfigure properties', () => {
    const instance = mock<Jogger>({ run: () => 10 })
    instance.run.returnsOnce(20)

    expect(instance.run()).to.equal(20)
  })

  it('handles values without overrides', () => {
    const instance = mock<Jogger>({})
    expect(() => instance.run()).to.throw(
      'Cannot call .run() - no mock implementation provided.',
    )
  })
})
