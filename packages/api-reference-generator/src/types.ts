export interface MethodComment {
  signature: string
  comment: string
}

export interface MethodDocumentation {
  signature: string
  description: string
  params: Param[]
  examples: string[]
}

export interface Param {
  name: string
  description: string
}
