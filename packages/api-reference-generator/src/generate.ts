import { sortBy } from 'lodash'

import { extractTsDocCommentsFromString } from './tsdocs/extract'
import { parseTsDocComment } from './tsdocs/parse'
import { MethodDocumentation } from './types'

export function generateSectionReference(sectionName: string, source: string) {
  const comments = extractTsDocCommentsFromString(source)
  const parsed = comments.map(parseTsDocComment)
  const sorted = sortBy(parsed, (d) => d.signature)

  return {
    tableOfContents: `### ${sectionName}\n\n` + generateTableOfContents(sorted),
    reference: `### ${sectionName}\n\n` + sorted.map(generateMarkdownForMethodDocumentation).join('\n'),
  }
}

/**
 * @internal
 */
export function generateMarkdownForMethodDocumentation(doc: MethodDocumentation): string {
  // We're generating Docusaurus flavor of Markdown.
  // https://docusaurus.io/docs/markdown-features/headings#explicit-ids
  const header = `\
#### **\`${doc.signature}\`** {#${encodeAnchor(doc.abbreviatedSignature)}}

${doc.description}
  `

  const params =
    doc.params.length &&
    `\
*Parameters:*

${doc.params.map((p) => `- \`${p.name}\` - ${p.description}`).join('\n')}
  `

  const examples =
    doc.examples.length &&
    `\
*Examples:*

${
  // Instead of rendering a few consecutive code snippets, we render a single,
  // examples separated with a blank line.
  doc.examples.reduce((a, v) => {
    if (a.endsWith('```')) return a.slice(0, -3) + v.replace(/```\w+\n/, '\n')
    else return a + '\n' + v
  }, '')
}`

  return [header, params, examples].filter(Boolean).join('\n')
}

/**
 * @internal
 */
export function generateTableOfContents(docs: MethodDocumentation[]) {
  const links = docs.map((d) => `- [\`${d.abbreviatedSignature}\`](#${encodeAnchor(d.abbreviatedSignature)})`)

  return links.join('\n')
}

/**
 * @internal
 */
export function encodeAnchor(signature: string): string {
  // @todo All function names should be unique, so we should free to use the identifier as HTML anchor id
  //       if we add better handling to method overloads.

  const res = signature.replace(/[><\\?.[\]= ]/g, '').replace(/[(),:]/g, '-')
  if (res.endsWith('-')) return res.slice(0, -1)
  return res
}
