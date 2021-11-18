import fc from 'fast-check'

export const anythingSettings = {
  key: fc.oneof(fc.string(), fc.constantFrom('k1', 'k2', 'k3')),
  maxDepth: 2, // Limit object depth (default: 2)
  maxKeys: 5, // Limit number of keys per object (default: 5)
  withBoxedValues: true,
  // Issue #7975 have to be fixed before enabling the generation of Map
  withMap: false,
  // Issue #7975 have to be fixed before enabling the generation of Set
  withSet: false,
}
