import { expect } from 'earljs'
import Parser from 'error-stack-parser'
import { utils } from 'mocha'

function captureError(fn: () => void) {
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

async function captureErrorAsync(fn: () => Promise<void>) {
  try {
    await fn()
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    throw error
  }
  throw new Error('No error captured!')
}

function getStack(error: Error) {
  const stack = utils.stackTraceFilter()(error.stack ?? '')
  return Parser.parse({ stack } as any).map((x) => ({
    at: x.functionName,
    file: x.fileName,
  }))
}

describe('stack traces', () => {
  it('captures correct synchronous stack traces', () => {
    const error = captureError(() => expect(1).toEqual(2))
    const stack = getStack(error)

    expect(stack[0]).toEqual({
      at: 'expect().toEqual',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[1]).toEqual({
      at: 'null.captureError',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[2]).toEqual({
      at: 'Context.<anonymous>',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
  })

  it('captures correct negated synchronous stack traces', () => {
    const error = captureError(() => expect(1).not.toEqual(1))
    const stack = getStack(error)

    expect(stack[0]).toEqual({
      at: 'expect().not.toEqual',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[1]).toEqual({
      at: 'null.captureError',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[2]).toEqual({
      at: 'Context.<anonymous>',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
  })

  it('captures correct synchronous stack traces for toThrow', () => {
    const error = captureError(() =>
      expect(() => {
        throw new Error('foo')
      }).toThrow('bar'),
    )
    const stack = getStack(error)

    expect(stack[0]).toEqual({
      at: 'expect().toThrow',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[1]).toEqual({
      at: 'null.captureError',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[2]).toEqual({
      at: 'Context.<anonymous>',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
  })

  it('captures correct asynchronous stack traces', async () => {
    const error = await captureErrorAsync(async () =>
      expect(await Promise.resolve(1)).toEqual(2),
    )
    const stack = getStack(error)

    expect(stack[0]).toEqual({
      at: 'expect().toEqual',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[1]).toEqual({
      at: 'null.captureErrorAsync',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[2]).toEqual({
      at: 'Context.<anonymous>',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
  })

  it('captures correct asynchronous stack traces for toBeRejectedWith', async () => {
    const error = await captureErrorAsync(() =>
      expect(async () => {
        throw new Error('foo')
      }).toBeRejectedWith('bar'),
    )
    const stack = getStack(error)

    expect(stack[0]).toEqual({
      at: 'expect().toBeRejectedWith',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[1]).toEqual({
      at: 'null.captureErrorAsync',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
    expect(stack[2]).toEqual({
      at: 'Context.<anonymous>',
      file: expect.includes('test-esbuild/stack-traces.test.ts'),
    })
  })
})
