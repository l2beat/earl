import { expect } from '../src'

const response = {
  body: {
    trimmed: true,
    timestamp: '12345',
    name: 'Alice Duck',
    age: 15,
  },
}

expect(response).toEqual({ body: { trimmed: true, timestamp: expect.anything(), name: expect.aS, age: expect.a(Number) } })
expect(response).toEqual()

expect(true).toEqual()

console.log('Done!')
