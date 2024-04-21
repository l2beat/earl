export const TEST_NULLISH = [null, undefined]

export const TEST_BOOLEANS = [true, false]

export const TEST_NUMBERS = [
  0,
  1,
  -1,
  0.5,
  42,
  Number.MAX_SAFE_INTEGER,
  Number.MIN_SAFE_INTEGER,
  Number.MAX_VALUE,
  Number.MIN_VALUE,
  Number.EPSILON,
  Number.NEGATIVE_INFINITY,
  Number.POSITIVE_INFINITY,
  NaN,
]

export const TEST_BIGINTS = [BigInt(0), BigInt(1), BigInt(-1000), BigInt(1000)]

export const TEST_STRINGS = ['', 'foo', 'a longer string', '$₽Ξ𝐂ɨⲀʟ']

export const TEST_SYMBOLS = [Symbol(), Symbol('foo'), Symbol.for('foo')]

class Vector {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
}

export const TEST_OBJECTS = [
  {},
  { x: 1, y: 1 },
  { foo: 'bar' },
  { a: { b: { c: {} } } },
  Object.create(null),
  new Vector(1, 2),
]

export const TEST_ARRAYS = [[], [1, 2, 3], ['foo', ['bar', 'baz']]]

export const TEST_SETS = [new Set(), new Set([1, 2, 3])]

export const TEST_MAPS = [
  new Map(),
  new Map([
    ['foo', 1],
    ['bar', 2],
  ]),
]

export const TEST_FUNCTIONS = [() => 1, function foo() {}, function* bar() {}]

export const TEST_PRIMITIVES = [
  ...TEST_NULLISH,
  ...TEST_BOOLEANS,
  ...TEST_NUMBERS,
  ...TEST_BIGINTS,
  ...TEST_STRINGS,
  ...TEST_SYMBOLS,
]

export const TEST_COMPLEX = [
  ...TEST_OBJECTS,
  ...TEST_ARRAYS,
  ...TEST_SETS,
  ...TEST_MAPS,
  ...TEST_FUNCTIONS,
]

export const TEST_VALUES = [...TEST_PRIMITIVES, ...TEST_COMPLEX]
