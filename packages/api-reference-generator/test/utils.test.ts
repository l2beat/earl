import { expect } from 'earljs'
import { encodeAnchor } from '../src/utils'

describe('encodeAnchor', () => {
  it.only('should encode special characters', () => {
    expect(encodeAnchor('toBeA(this: Expectation<T>, clazz: any)')).toEqual('tobeathis-expectation-clazz-any')
    expect(encodeAnchor('toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[])')).toEqual(
      'tobeacontainerwiththis-expectation-expecteditems-any',
    )
    expect(encodeAnchor('toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number)')).toEqual(
      'tobeanarrayoflengththis-expectationreadonlyarray-length-number',
    )
    // expect(
    //   encodeAnchor('toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>)'),
    // ).toEqual('tobeanarraywiththis-expectationreadonlyarray-expecteditems-readonlyarray')
  })
})
