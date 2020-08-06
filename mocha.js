const d = require('debug')('earl:mocha')

/**
 * Integrate earl with mocha
 */
async function main() {
  d('Integrating with mocha...')

  await Promise.resolve()

  beforeEach(function () {
    d('Running beforeEach')
  })

  afterEach(function () {
    d('Running afterEach')
  })
}

main()
