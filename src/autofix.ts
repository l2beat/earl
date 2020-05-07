import { readFileSync, writeFileSync } from 'fs'

const StackTracey = require('stacktracey')

export function autofix(_oldValue: any, newValue: any) {
  const stack = new StackTracey()

  // this should traverse trace to find first trace outside this file
  const s = stack[2]
  const filePath = s.file
  const line = s.line - 1

  const source = readFileSync(filePath, 'utf8')
  const lines = source.split('\n')
  const lineWithInvocation = lines[line]
  // this is super primitive, and won't work for more complicated cases...
  // probably soon we will have to rewrite to regular AST parsing
  const newLine = lineWithInvocation.replace(/toEqual\((.*)\)/, `toEqual(${toLiteral(newValue)})`)
  lines[line] = newLine
  writeFileSync(filePath, lines.join('\n'), 'utf8')
}

function toLiteral(value: any): string {
  return JSON.stringify(value)
}
