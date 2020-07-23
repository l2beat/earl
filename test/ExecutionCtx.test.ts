import { expect } from 'chai'
import sinon from 'sinon'

import { expect as expectEarl } from '../src'
import { ExecutionCtx } from '../src/ExecutionCtx'

describe('ExecutionCtx', () => {
  it('registers and verifies mocks', () => {
    const mockMock = {
      isExhausted: sinon.spy(() => true),
    }

    const executionCtx = new ExecutionCtx()
    executionCtx.registerMock(mockMock as any)

    expectEarl(() => executionCtx.verifyAllMocks()).not.toThrow()
    expect(mockMock.isExhausted).to.be.calledOnceWithExactly()
  })

  it('resets', () => {
    const mockMock = {
      isExhausted: sinon.spy(() => false),
    }

    const executionCtx = new ExecutionCtx()
    executionCtx.registerMock(mockMock as any)
    executionCtx.reset()

    expectEarl(() => executionCtx.verifyAllMocks()).not.toThrow()
    expect(mockMock.isExhausted).not.to.be.called
  })
})
