process.env.NODE_ENV = 'test'
module.exports = {
  spec: 'test-esbuild/**/*.test.ts',
  require: 'esbuild-register',
  watchExtensions: 'ts',
  extension: 'ts',
}
