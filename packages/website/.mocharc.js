process.env.NODE_ENV = 'test'
module.exports = {
  spec: 'generators/**/*.test.ts',
  require: 'ts-node/register/transpile-only',
  watchExtensions: 'ts',
  extension: 'ts',
}
