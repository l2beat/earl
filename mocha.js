const d = require('debug')('earl:mocha')

const { autoloadPlugins } = require('./dist/plugins')
const { default: defaultExecutionCtx } = require('./dist/ExecutionCtx')

exports.mochaGlobalSetup = async function () {
  d('Integrating with mocha...')

  const pluginConfig = await autoloadPlugins()
  defaultExecutionCtx.pluginConfig = pluginConfig
  d(`Loaded validators: ${pluginConfig.validators.length}`)
  d(`Loaded matchers: ${pluginConfig.matchers.length}`)
}
