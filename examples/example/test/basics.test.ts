import { expect } from 'earljs'

describe('basics', () => {
  it('works', function (this: Mocha.Context) {
    class Person {
      constructor(readonly name: string) {}
    }

    const response = {
      trimmed: true,
      timestamp: '12345',
      name: 'Alice Duck',
      age: 15,
      nested: {
        b: new Person('Jack'),
        deep: {
          nested: true,
        },
      },
    }

    expect(response).toEqual({
      trimmed: true,
      timestamp: expect.anything(),
      name: expect.stringMatching(/[Dd]uck/),
      age: expect.a(Number),
      nested: {
        b: expect.a(Person),
        deep: expect.a(Object),
      },
    })

    expect(true).toEqual(true)

    expect(response).toMatchSnapshot(this)
  })
})
