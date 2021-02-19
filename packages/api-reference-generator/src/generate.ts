import { sortBy } from 'lodash'

import { MethodDocumentation } from './types'

export function generateMarkdownForMethodDocumentation(doc: MethodDocumentation): string {
  return `#### ${doc.signature}

${doc.description}

*Parameters:*
${doc.params.map((p) => `- \`${p.name}\` - ${p.description}`).join('\n')}

*Examples:*
${doc.examples.join('\n')}`
}

export function generateTableOfContents(docs: MethodDocumentation[]) {
  const sorted = sortBy(docs, (d) => d.signature)

  const links = sorted.map((d) => `- [${d.signature}](#${encodeAnchor(d.signature)})`)

  return links.join('\n')
}

// I was unable to find a ready implementation for this so i ended up writing my own half-assed implementation. This might need tweaking...
function encodeAnchor(input: string): string {
  return input
    .toLowerCase()
    .replace(/[(),:]/g, '')
    .replace(/ /g, '-')
}
