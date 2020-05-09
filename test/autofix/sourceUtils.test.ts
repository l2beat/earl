import { expect } from 'chai'

import { replaceCallInSource } from '../../src/autofix/sourceUtils'

describe('replaceCall', () => {
  it('works when no previous value was provided', () => {
    const source = `
console.log("Hello world");
expect(result).toEqual();
console.log("Hello world");
    `
    const modifiedSource = replaceCallInSource({ source, line: 2, column: 15, call: 'toEqual', newArg: `'newValue'` })

    expect(modifiedSource).to.eq(`
console.log("Hello world");
expect(result).toEqual('newValue');
console.log("Hello world");
    `)
  })

  it('works with ill formatted source', () => {
    const source = `
console.log("Hello world");
expect(result).
  toEqual();


console.log("Hello world");
    `
    const modifiedSource = replaceCallInSource({ source, line: 3, column: 2, call: 'toEqual', newArg: `'newValue'` })

    expect(modifiedSource).to.eq(`
console.log("Hello world");
expect(result).
  toEqual('newValue');


console.log("Hello world");
    `)
  })

  it("throws when position doesn't point at source", () => {
    const source = `console.log("Hello world");`
    expect(() => replaceCallInSource({ source, line: 2, column: 0, call: 'toEqual', newArg: `'newValue'` })).to.throw(
      'Location 2:0 out of file',
    )
  })

  it("throws when position doesn't at expected function call", () => {
    const source = `expect(result).toEqual();`
    expect(() => replaceCallInSource({ source, line: 0, column: 0, call: 'toEqual', newArg: `'newValue'` })).to.throw(
      `Couldn't find a call toEqual at location 0:0`,
    )
  })
})
