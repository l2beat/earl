/* eslint-disable symbol-description */
/* eslint-disable no-new-wrappers */

import { expect } from '../expect.js'

describe('isEqual performance', function () {
  this.timeout(10_000)

  const dataObject = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: {
      city: 'New York',
      state: 'New York',
      country: 'USA',
      zip: '10001',
      street: '123 Main St',
    },
    profile: {
      gender: 'Male',
      birthdate: '1980-01-01',
      pictureUrl: 'https://example.com/john-doe.jpg',
    },
    preferences: {
      language: 'English',
      currency: 'USD',
    },
    roles: ['User', 'Admin'],
  }

  it('measure', () => {
    const repeat = 5
    const iterations = 2000
    const testValue = [dataObject, dataObject, dataObject]

    for (let i = 0; i < repeat; i++) {
      const time = Date.now()
      for (let j = 0; j < iterations; j++) {
        expect(testValue).toEqual(testValue)
      }
      console.log(`${Date.now() - time}ms`)
    }
  })
})
