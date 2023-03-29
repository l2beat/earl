export function formatSnapshot(snapshot: Record<string, string>) {
  return Object.entries(snapshot)
    .map(([name, value]) => `// ${name}\n\n${value}\n`)
    .join('\n')
}

export function parseSnapshot(snapshot: string) {
  const result: Record<string, string> = {}
  let name: string | undefined
  let value = ''
  for (const line of snapshot.split('\n')) {
    if (line.startsWith('// ')) {
      if (name) {
        result[name] = value.slice(1, -2)
      }
      name = line.slice(3)
      value = ''
    } else {
      value += line + '\n'
    }
  }
  if (name) {
    result[name] = value.slice(1, -2)
  }
  return result
}
