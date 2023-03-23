process.env.NODE_ENV = 'test'
module.exports = {
  spec: 'test-babel/**/*.test.js',
  require: '@babel/register',
  watchExtensions: 'js',
  extension: 'js',
}
