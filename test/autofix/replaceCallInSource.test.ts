import { expect as expectEarl } from '../../src'
import { NoCallSiteError, OutOfFileError, replaceCallInSource } from '../../src/autofix/replaceCallInSource'

describe('replaceCallInSource', () => {
  it('works when no previous value was provided', () => {
    const source = `
console.log("Hello world");
expect(result).toEqual();
console.log("Hello world");
    `
    const modifiedSource = replaceCallInSource({ source, line: 2, column: 15, call: 'toEqual', newArg: `'newValue'` })

    expectEarl(modifiedSource).toEqual(`
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

    expectEarl(modifiedSource).toEqual(`
console.log("Hello world");
expect(result).
  toEqual('newValue');


console.log("Hello world");
    `)
  })

  it("throws when position doesn't point at source", () => {
    const source = `console.log("Hello world");`
    expectEarl(() =>
      replaceCallInSource({ source, line: 2, column: 0, call: 'toEqual', newArg: `'newValue'` }),
    ).toThrow(expectEarl.error(OutOfFileError))
  })

  it("throws when position doesn't at expected function call", () => {
    const source = `expect(result).toEqual();`
    expectEarl(() =>
      replaceCallInSource({ source, line: 0, column: 0, call: 'toEqual', newArg: `'newValue'` }),
    ).toThrow(expectEarl.error(NoCallSiteError))
  })
})
