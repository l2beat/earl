process.env.NODE_ENV = 'test'
module.exports = {
  spec: 'src/**/*.test.ts',
  file: 'src/test/setup.ts',
  // require: 'ts-node/register/transpile-only',
  'node-option': [
    'experimental-specifier-resolution=node',
    'loader=ts-node/esm/transpile-only',
  ],
  watchExtensions: ['js', 'ts'],
  extension: ['js', 'ts'],
}
