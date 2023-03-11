process.env.NODE_ENV = 'test'
module.exports = {
  spec: 'src/**/*.test.ts',
  require: 'ts-node/register/transpile-only',
  watchExtensions: 'ts',
  extension: 'ts',
}
