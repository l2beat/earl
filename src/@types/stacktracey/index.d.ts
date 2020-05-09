declare module 'stacktracey' {
  interface Stack {
    file: string
    line: number
    column: number
  }

  export default class StackTracey {
    [i: number]: Stack
  }
}
