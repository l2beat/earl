---
"earl": minor
---

All matchers now return the `never` type. `never` can be assigned to any other type while preventing accidental usage of the value returned from the matcher.

All number matchers except `.toBeCloseTo` can now process bigints.

Add new validators:

- toBeAnInteger
- toBeASafeInteger
- toBePositive
- toBeNegative
