import debug from 'debug'

import { expect } from './expect'
import { Mock } from './mocks/common'

const d = debug('earl:ExecutionCtx')

/**
 * Used to track entities (like mocks) created during single test run
 * @todo: this has to be slightly more complicated to support cases like mocks defined outside single test body. Probably it should support layers of entities
 */
export class ExecutionCtx {
  private mocks: Mock[] = []

  registerMock(mock: Mock): void {
    d('Registering new mock')

    this.mocks.push(mock)
  }

  verifyAllMocks(): void {
    d(`Verifying all mocks: ${this.mocks.length}`)

    for (const mock of this.mocks) {
      expect(mock).toBeExhausted()
    }
  }

  reset(): void {
    d('Reset')

    this.mocks = []
  }
}

export const defaultExecutionCtx = new ExecutionCtx()
