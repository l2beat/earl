import { expect } from '../src'

const response = {
  body: {
    trimmed: true,
    timestamp: '12345',
  },
}

expect(response).toEqual({ body: { trimmed: true, timestamp: expect.anything() } })
expect(response).toEqual()

expect(true).toEqual(true)

console.log('Done!')
