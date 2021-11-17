module.exports = {
  require: ['ts-node/register/transpile-only', 'earljs/mocha'],
  extension: ['ts'],
  watchExtensions: ['ts'],
  spec: ['*.test.stub.ts'],
}
