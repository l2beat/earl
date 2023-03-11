process.env.NODE_ENV = 'test'
module.exports = {
  spec: '{src,test}/**/*.test.ts',
  file: 'test/setup.ts',
  require: 'ts-node/register/transpile-only',
  watchExtensions: 'ts',
  extension: 'ts',
}
