import { expect } from '../src'

const response = {
  body: {
    dupa: true,
    timestamp: '12345',
  },
}

expect(response).toEqual({ body: { dupa: true, timestamp: expect.anything() } })
expect(response).toEqual()

expect(true).toEqual(true)

console.log('Done!')
