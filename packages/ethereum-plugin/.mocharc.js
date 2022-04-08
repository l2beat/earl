// ensure NODE_ENV
process.env.NODE_ENV = 'test'

// exit test runner on unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection during test execution:', promise, 'reason:', reason)
  console.log({ 'process.argv': process.argv })
  process.exit(1)
})

module.exports = {
  require: ['ts-node/register/transpile-only'],
  file: ['./test/setup.ts'],
  extension: 'ts',
  watchExtensions: 'ts',
  spec: 'test/**/*.test.ts',
}
