import { expect } from 'earljs'

describe('aPrivateKey', () => {
  describe('matches private keys', () => {
    const passingCases = [
      '0x319a66d5912bd7b08efb26c2ea2f0b68d521653e3a49db9864d683997be9ed4d',
      '0xdb646a766da01153ec791413a7288394736b21cb5645606639bbc7e8b3cc5c5b',
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    ]

    for (const value of passingCases) {
      it(`expect("${value}").toEqual(expect.aPrivateKey())`, () => {
        expect(value).toEqual(expect.aPrivateKey())
      })
    }
  })

  describe('does not match other strings', () => {
    const failingCases = [
      '0xcaed41dd92c154',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0xcaed41dd92c1548cf7536c290e6a1871757fb5fea5721dea3a08c6d4abcd16cg',
      'foo',
    ]

    for (const value of failingCases) {
      it(`expect("${value}").not.toEqual(expect.aPrivateKey())`, () => {
        expect(value).not.toEqual(expect.aPrivateKey())
      })
    }
  })
})
