const d = require('debug')('earl:mocha')

const { defaultExecutionCtx } = require('./dist/ExecutionCtx')
/**
 * Integrate earl with mocha
 */
async function main() {
  d('Integrating with mocha...')

  await Promise.resolve()

  beforeEach(function () {
    d('Running beforeEach')
    defaultExecutionCtx.reset()
  })

  afterEach(function () {
    d('Running afterEach')
    defaultExecutionCtx.verifyAllMocks()
  })
}

main()
