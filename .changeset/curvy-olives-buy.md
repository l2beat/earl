---
"earl": minor
---

Add matchers to cover the old use cases and some new. Below is a list of current matchers:

- `expect.a(Class)` - Matches an instance of a provided class or a primitive type.
- `expect.anything()` - Matches any value.
- `expect.between(min, max)` - Matches numbers that are between the two numbers.
- `expect.check(predicate)` - Matches values for which the predicate returns `true`.
- `expect.closeTo(target, delta)` - Matches numbers that are close to the target value.
- `expect.defined()` - Matches values that are not `null` or `undefined`.
- `expect.empty()` - Matches empty strings, arrays, sets and maps.
- `expect.falsy()` - Matches falsy values.
- `expect.includes(...items)` - Matches an array, Set or iterable that includes the given item or items.
- `expect.integer()` - Matches integers between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.
- `expect.length(length)` - Matches an array, string or any object with a `length` property that has the given length.
- `expect.max(max)` - Matches numbers that are less or equal to a given maximum.
- `expect.min(min)` - Matches numbers that are greater or equal to a given minimum.
- `expect.negative()` - Matches numbers that are less than 0.
- `expect.nonEmpty()` - Matches non-empty strings, arrays, sets and maps.
- `expect.nullish()` - Matches `null` or `undefined`.
- `expect.partial(subset)` - Matches an object containing the given key value pairs.
- `expect.positive()` - Matches numbers that are greater than 0.
- `expect.regex(regex)` - Matches strings that match a regular expression.
- `expect.schema(schema)` - Matches values conforming to a schema.
- `expect.substring(substring)` - Matches strings that include a given substring.
- `expect.truthy()` - Matches truthy values.
- `expect.unsafeInteger()` - Matches numbers that are integers. Doesn't check against MIN_SAFE_INTEGER nad MAX_SAFE_INTEGER.
