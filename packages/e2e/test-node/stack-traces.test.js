const { expect } = require('earljs')

function captureError(fn) {
  try {
    fn()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    throw error
  }
  throw new Error('No error captured!')
}

describe('stack traces', () => {
  it('captures correct synchronous stack traces', () => {
    const error = captureError(() => expect(1).toEqual(2))

    console.log(error.stack)
    console.log(error.constructor.name)
    expect(1).toEqual(2)
  })
})
