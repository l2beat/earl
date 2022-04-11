module.exports = {
  require: ['ts-node/register/transpile-only', require.resolve('earljs/mocha')],
  extension: ['ts'],
  watchExtensions: ['ts'],
  spec: ['*.tested.ts'],
}
