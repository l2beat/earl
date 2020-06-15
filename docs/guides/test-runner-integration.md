---
title: Test runner integration
---

By integrating with a test runner you get:

- automatic mocks verification after each test

Currently only integration with `mocha` is supported. To enable, simply require
`earljs/mocha` with mocha, you can put it in `.mocharc.js`:

```js
module.exports = {
  require: ['earljs/mocha'],
  // ...
}
```
