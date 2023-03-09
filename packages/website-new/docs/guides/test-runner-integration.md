---
title: Test runner integration
editLink: true
---

# {{ $frontmatter.title }}

Basic capabilities of Earl should work in all test runners. If you're not using
snapshot tests, feel free to skip this.

Currently, we support integrations with [`mocha`][mocha] and [`uvu`][uvu].

[mocha]: https://mochajs.org/
[uvu]: https://github.com/lukeed/uvu

## earljs/mocha

Add `'earljs/mocha'` to `require` array in your `.mocharc.js`:

```js
module.exports = {
  require: ['earljs/mocha'],
}
```

Alternatively, you can require `earljs/mocha` in your test command:

```sh
$ mocha -r earljs/mocha
```

## earljs/uvu

Require `earljs/uvu` in your test command:

```sh
# using the uvu cli
$ uvu -r earljs/uvu tests

# using node directly
$ node -r earljs/uvu tests/example.test.js
```

That's it!
