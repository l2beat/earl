import { fileURLToPath } from 'node:url'

export type TestContext = NodeTestContext | MochaTestContext | UvuTestContext

export interface NodeTestContext {
  name: string
}

export interface MochaTestContext {
  test?: {
    file?: string
    fullTitle(): string
  }
}

export interface UvuTestContext {
  __test__?: string
  __suite__?: string
}

export function getTestFile(context: TestContext): string | undefined {
  if ('test' in context) {
    const file = context.test?.file
    if (typeof file === 'string') {
      if (file.startsWith('file://')) {
        return fileURLToPath(file)
      }
      return file
    }
  }
}

export function getTestName(context: TestContext): string | undefined {
  if ('test' in context) {
    if (typeof context.test?.fullTitle === 'function') {
      const title = context.test.fullTitle()
      if (typeof title === 'string') {
        return title
      }
    }
  }
  if ('__test__' in context) {
    const parts = [context.__test__]
    if (context.__suite__) {
      parts.unshift(context.__suite__)
    }
    return parts.filter((x) => x !== undefined).join(' ')
  }
  if ('name' in context && typeof context.name === 'string') {
    return context.name
  }
}
