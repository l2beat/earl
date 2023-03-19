---
"earljs": minor
---

Remove a lot of old functionality, improve plugin system.

Previously the plugins were a bit of a mess, and people didn't really understand
how to add custom matchers or validators. It is now really easy to add your own.

Adding validators is now as simple as:

```ts
import { Control, formatCompact, registerValidator } from "earljs";

// we use the module augmentation feature of typescript to keep it type safe
declare module "earljs" {
  interface Validators<T, R> {
    // note the this: Validators<number> part
    // it ensures that the validator is only available on numbers
    toBeEven(this: Validators<number, R>): R;
  }
}

registerValidator("toBeEven", toBeEven);

export function toBeEven(control: Control<number>) {
  const actualFmt = formatCompact(control.actual);
  control.assert({
    success: control.actual % 2 === 0,
    reason: `${actualFmt} is not even!`,
    negatedReason: `${actualFmt} is even!`,
  });
}

// later

import { expect } from "earljs";

expect(2).toBeEven();
```

Adding matchers is also really easy:

```ts
import { registerMatcher } from "earljs";

// we again use the module augmentation feature of typescript to keep it type safe
declare module "earljs" {
  interface Matchers {
    // note that the matcher returns a number and not a boolean like the implementation
    // it ensures that the matcher can be used as a substitute for a real number in .toEqual()
    evenNumber(): number;
  }
}

registerMatcher("evenNumber", evenNumber);

function evenNumber() {
  return (value: unknown): boolean => {
    return typeof value === "number" && value % 2 === 0;
  };
}
```

Unfortunately this was a big change and took a lot of features with it. The following features were removed:

- custom equality rules. There is currently no plan to bring them back
- plugins. Counterintuitive, but basically any validator or matcher including the built in ones is defined in exactly the same way. There is no extra magic for plugin authors.
- a lot of matchers and validators. They will be reintroduced shortly. The current list of available ones is as follows:
  - `expect(...).toEqual(...)`
  - `expect(...).toMatchSnapshot(ctx)`
  - `expect.a(Class)`
  - `expect.anything()`
  - `expect.nullish()`
  - `expect.stringMatching(substringOrRegexp)`
