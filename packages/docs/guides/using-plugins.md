---
title: Using plugins
---

Using plugins with **earl** couldn't be simpler. Just install a plugin package
and then simply import it.

```typescript
import "earljs-awesome-plugin
```

## With Mocha

We recommend creating `setup.test.ts` file that is automatically recognized as
test file, and put these import statements there.

Note that you can't require plugin by using `--require` command line option
because then typings for plugin won't load.
