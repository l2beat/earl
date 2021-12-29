import { expect } from '@earljs/published'

import { encodeAnchor, generateMarkdownForMethodDocumentation, generateTableOfContents } from '../src/generate'
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
        signature: 'expect<T>(value: T, options: Options)',
        abbreviatedSignature: 'expect<T>(value: T, options: Options)',
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
  it('should encode special characters', () => {
    expect(encodeAnchor('expect<T>(x: T): void')).toEqual('expectT-x-T--void')
    expect(encodeAnchor('toBeAnArrayWith(...expectedItems: ReadonlyArray<any>): void')).toEqual(
      'toBeAnArrayWith-expectedItems-ReadonlyArrayany--void',
    )
    expect(encodeAnchor('toBeA(this: Expectation<T>, clazz: any)')).toEqual('toBeA-this-ExpectationT-clazz-any')
    expect(encodeAnchor('toBeAContainerWith(this: Expectation<any>, ...expectedItems: any[])')).toEqual(
      'toBeAContainerWith-this-Expectationany-expectedItems-any',
    )
    expect(encodeAnchor('toBeAnArrayOfLength(this: Expectation<ReadonlyArray<any>>, length: number)')).toEqual(
      'toBeAnArrayOfLength-this-ExpectationReadonlyArrayany-length-number',
    )
    expect(
      encodeAnchor('toBeAnArrayWith(this: Expectation<ReadonlyArray<any>>, ...expectedItems: ReadonlyArray<any>)'),
    ).toEqual('toBeAnArrayWith-this-ExpectationReadonlyArrayany-expectedItems-ReadonlyArrayany')
    expect(encodeAnchor('toMatchSnapshot()')).toEqual('toMatchSnapshot')
  })
})
