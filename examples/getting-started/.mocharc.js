// Ensure that the NODE_ENV is set to test
process.env.NODE_ENV = "test";
module.exports = {
  // We need to tell mocha where to find our test files
  spec: "src/**/*.test.ts",
  // We're going to use ts-node to transpile our code on the fly
  require: "ts-node/register/transpile-only",
  // Finally, we're telling mocha to use the ts extension instead of js
  watchExtensions: "ts",
  extension: "ts",
};
