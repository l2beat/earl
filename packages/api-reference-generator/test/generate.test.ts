import { expect } from 'earljs'

import { generateMarkdownForMethodDocumentation, generateTableOfContents } from '../src/generate'
import { encodeAnchor } from '../src/generate'
import { parseTsDocComment } from '../src/tsdocs/parse'
import { MethodDocumentation } from '../src/types'
import { sampleMethodComment } from './tsdocs/parse.test'

describe('generateMarkdownForMethodDocumentation', () => {
  it('generates markdown for a comment with params and examples', async () => {
    const result = generateMarkdownForMethodDocumentation(parseTsDocComment(sampleMethodComment))

    expect(result).toMatchSnapshot()
  })
})

describe('generateTableOfContents', () => {
  it('generates valid TOC', () => {
    const docs: MethodDocumentation[] = [
      {
        signature: 'sample()',
        abbreviatedSignature: 'sample()',
        description: '',
        examples: [],
        params: [],
      },
      {
        signature: 'expect(value: any, options: Options)',
        abbreviatedSignature: 'expect(value: any, options: Options)',
        description: '',
        examples: [],
        params: [],
      },
      {
        signature: 'expect<TYPE>(value: any, options: Options)',
        abbreviatedSignature: 'expect<TYPE>(value: any, options: Options)',
        description: '',
        examples: [],
        params: [],
      },
    ]

    const result = generateTableOfContents(docs)

    expect(result).toMatchSnapshot()
  })
})

describe('encodeAnchor', () => {
  it.skip('should encode special characters', () => {
    expect(encodeAnchor('toBeAnArrayWith(...expectedItems: ReadonlyArray<any>): void')).toEqual('toBeAnArrayWith')

    // expect(encodeAnchor('toBeA(this: Expectation<T>, clazz: any)')).toEqual('tobeathis-expectation-clazz-any')
    // expect(encodeAnchor('toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[])')).toEqual(
    //   'tobeacontainerwiththis-expectation-expecteditems-any',
    // )
    // expect(encodeAnchor('toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number)')).toEqual(
    //   'tobeanarrayoflengththis-expectationreadonlyarray-length-number',
    // )
    // expect(
    //   encodeAnchor('toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>)'),
    // ).toEqual('tobeanarraywiththis-expectationreadonlyarray-expecteditems-readonlyarray')
  })
})
