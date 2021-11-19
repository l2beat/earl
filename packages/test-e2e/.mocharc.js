process.env.NODE_ENV = 'test'

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection during test execution:', promise, 'reason:', reason)
  process.exit(1)
})

module.exports = {
  require: ['ts-node/register/transpile-only'],
  file: ['./test/setup.ts'],
  extension: 'ts',
  watchExtensions: 'ts',
  spec: 'test/**/*.test.ts',
}
