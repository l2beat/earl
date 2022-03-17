---
'earljs': patch
---

Snapshot tests in `uvu` are now supported with `earljs/uvu`.

To use Earl with `uvu`, require `earljs/uvu` in your test command:

```sh
# using the uvu cli
$ uvu -r earljs/uvu tests

# using node directly
$ node -r earljs/uvu tests/example.test.js
```
