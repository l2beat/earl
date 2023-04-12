import { expect } from 'chai'

import { isMockFn } from './mockFn.js'
import { mockObject } from './mockObject.js'

describe(mockObject.name, () => {
  class Jogger {
    name = 'A'
    run() {
      return 1
    }
  }

  it('can mock a class', () => {
    const instance = mockObject<Jogger>({
      name: 'B',
      run: () => 10,
    })

    expect(instance.name).to.equal('B')
    expect(instance.run()).to.equal(10)

    expect(isMockFn(instance.run)).to.equal(true)
  })

  it('can reconfigure properties', () => {
    const instance = mockObject<Jogger>({ run: () => 10 })
    instance.run.returnsOnce(20)

    expect(instance.run()).to.equal(20)
  })

  it('handles values without overrides', () => {
    const instance = mockObject<Jogger>({})
    expect(() => instance.run()).to.throw(
      'Cannot access .run - no mock value provided.',
    )
  })
})
