process.env.NODE_ENV = 'test'
module.exports = {
  spec: 'src/**/*.test.ts',
  file: 'src/test/setup.ts',
  'node-option': [
    'experimental-specifier-resolution=node',
    'loader=ts-node/esm',
  ],
  watchExtensions: ['js', 'ts'],
  extension: ['js', 'ts'],
}
