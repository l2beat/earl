import { expect } from './expect'

const response = {
  body: {
    dupa: true,
    timestamp: '12345',
  },
}

expect(response).toEqual({ body: { dupa: true, timestamp: expect.anything() } })

expect(5).toEqual(5)

expect(true).toEqual(true)

console.log('Done!')
