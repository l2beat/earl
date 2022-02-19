---
title: Test runner integration
---

By integrating with a test runner you get:

- snapshot testing support

Currently integration with [`mocha`](https://mochajs.org/) or
[`uvu`](https://github.com/lukeed/uvu) is supported.

To enable with mocha, simply require `earljs/mocha` in `.mocharc.js`:

```js
module.exports = {
  require: ['earljs/mocha'],
  // ...
}
```

To enable with uvu, require `earljs/uvu` in your test command:

```sh
# using the uvu cli
$ uvu -r earljs/uvu tests

# using node directly
$ node -r earljs/uvu tests/example.test.js
```

That's it!
