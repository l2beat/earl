import { expect } from '../src'

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
  name: expect.stringMatching('Duck'),
  age: expect.a(Number),
  nested: {
    b: expect.a(Person),
    deep: expect.a(Object),
  },
})

expect(response).toEqual()

expect(true).toEqual()

console.log('Done!')
