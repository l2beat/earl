---
"earl": minor
---

Changes to matchers:

- Rename `.max` to `.lessThanOrEqual` matcher
- Add `.lessThan` matcher
- Rename `.min` to `.greaterThanOrEqual` matcher
- Add `.greaterThan` matcher
- Rename `.nonEmpty` to `.notEmpty` matcher
- Rename `.partial` to `.subset` matcher
- Rename `.check` to `.satisfies` matcher
- Merge `.substring` and `.includes` matchers
- Update `.defined` matcher to only check for `undefined`
- Add `.notNullish` matcher
- Add `.property`(key, value?) matcher
