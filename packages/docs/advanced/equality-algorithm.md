---
id: equality-algorithm
title: Equality Algorithm
---

The equality algorithm is an extensible and parameterized deep equality checker.
It is used by all functions that check deep equality inside earl.

## Algorithm

To determine the equality of two values the following checks are executed:

1. If the second value is a [Matcher](/guides/using-matchers.md) and it...
   1. matches the first value, then the values are considered equal;
   1. doesn't match the first value, then the values are considered unequal.
1. Every [custom equality rule](/advanced/plugin-development.md) is checked.
   1. If it returns undefined the next rule is checked or the algorithm
      advances.
   1. If it returns success, then the values are considered equal.
   1. If it returns error, then the values are considered unequal.
1. If any of the values is equal to one of it's ancestors (is a self-referencing
   object)...
   1. If the other value is equal to it's ancestor of the same distance (e.g.
      grandparent and grandparent), then the values are considered equal.
   2. Otherwise they are considered unequal.
1. A [category](#categories) is determined for each value based on the rules of
   each category.
   1. If the values have different categories, then they are considered unequal.
   1. If the category is the same the values are compared according to rules of
      that category.

Additionally the algorithm takes the following options:

- `uniqueNaNs` - Considers two `NaN` values unequal, defaults to `false`.
- `minusZero` - Considers `+0` and `-0` unequal, defaults to `false`.
- `ignorePrototypes` - Considers `new Vector2(1, 2)` and `{ x: 1, y: 2 }` equal,
  defaults to `false`. This option is set to `true` when using
  [`.toLooseEqual`](/api/api-reference.md#toLooseEqual-value-any).
- `compareErrorStack` - Compares the stack property of `Error` instances,
  defaults to `false`.

## Categories

### Primitive

A value belongs to the Primitive category if `typeof value` returns any of the
following:

- `"undefined"`
- `"boolean"`
- `"number"`
- `"bigint"`
- `"string"`
- `"symbol"`
- `"object"`, but only if the value is `null`

The equality of values belonging to the Primitive category is determined in the
following way:

1. If both values are `NaN` and `uniqueNaNs` is set to `false`, then the values
   are considered equal.
1. If `minusZero` is set to `true` then `0` is only considered equal to `0` and
   `-0` is only considered equal to `-0`.
1. Otherwise it is determined by the `===` operator.

### Function, Promise, WeakMap, WeakSet

A value belongs to the...

- Function category if `typeof value` returns `"function"`.
- Promise category if `value instanceof Promise` returns `true`.
- WeakMap category if `value instanceof WeakMap` returns `true`.
- WeakSet category if `value instanceof WeakSet` returns `true`.

The equality of values belonging to those categories is determined by the `===`
operator.

### Array

A value belongs to the Array category if `Array.isArray(value)` returns `true`.

The equality of values belonging the the Array category is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. If the values have different `length`s, then they are considered unequal.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

### Date, Number, Boolean

A value belongs to the...

- Date category if `value instanceof Date` returns `true`.
- Number category if `value instanceof Number` returns `true`.
- Boolean category if `value instanceof Boolean` returns `true`.

The equality of values belonging to those categories is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. If `value.valueOf()` returns different values, then they are considered
   unequal.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

### String

A value belongs to the String category if `value instanceof String` returns
`true`.

The equality of values belonging to the String category is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. If `value.valueOf()` returns different values, then they are considered
   unequal.
1. All number keys (e.g. `"1"`) are removed during recursive object equality
   check.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

### RegExp

A value belongs to the RegExp category if `value instanceof RegExp` returns
`true`.

The equality of values belonging to the RegExp category is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. If `value.toString()` returns different values, then they are considered
   unequal.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

### Error

A value belongs to the Error category if `value instanceof Error` returns
`true`.

The equality of values belonging to the Error category is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. If `compareErrorStack` is set to `false` then the `"stack"` key is removed
   during recursive object equality check.
1. If `compareErrorStack` is set to `true` then the `"stack"` key is added
   during recursive object equality check.
1. The `"name"` and `"message"` keys are added during recursive object equality
   check.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

### Set

A value belongs to the Set category if `value instanceof Set` returns `true`.

The equality of values belonging to the Set category is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. If the values have different `size`s, then they are considered unequal.
1. If `.has` returns `false` for any contained value of the other set, then they
   are considered unequal.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

### Map

A value belongs to the Map category if `value instanceof Map` returns `true`.

The equality of values belonging to the Map category is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. If the values have different `size`s, then they are considered unequal
1. If `.has` returns `false` for any map key of the other map, then they are
   considered unequal.
1. The values of the objects are compared using the
   [Equality Algorithm](#algorithm). The objects are considered unequal if any
   of their values are considered unequal.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

### Object

A value belongs to the Object category if it doesn't belong to any other
category.

The equality of values belonging to the Object category is determined in the
following way:

1. If `ignorePrototypes` is set to `false` and the values have different
   prototypes, then they are considered unequal.
1. The objects are compared using
   [recursive object equality](#recursive-object-equality).

## Recursive object equality

When comparing objects recursively first an array of property keys is obtained
using `Object.keys`:

1. If the category specifies keys to be added to this array they are only added
   if they are present on the object as determined by the `in` operator.
1. If the category specifies keys to be removed from this array then they are
   only removed if they are already present in the array.
1. The keys of both objects are then sorted and compared. If the number of keys
   or any of the keys is different then the objects are considered unequal.

After comparing the keys the properties at those keys are compared using the
[Equality Algorithm](#algorithm). The objects are considered equal if and only
if all of their properties are considered equal.
