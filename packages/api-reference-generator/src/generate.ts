import { sortBy } from 'lodash'

import { extractTsDocCommentsFromString } from './tsdocs/extract'
import { parseTsDocComment } from './tsdocs/parse'
import { MethodDocumentation } from './types'

export function generateSectionReference(sectionName: string, prefix: string, source: string) {
  const comments = extractTsDocCommentsFromString(source)
  const parsed = comments
    .filter(
      (c) =>
        // @todo stop assuming functions and emit reference for types and exported values
        !c.signature.match(/export interface |const /),
    )
    .map(parseTsDocComment)

  const sorted = sortBySignatures(parsed)

  const prefixed = sorted.map((c) => ({
    ...c,
    signature: prefixMethodSignature(prefix, c.signature),
    abbreviatedSignature: prefixMethodSignature(prefix, c.abbreviatedSignature),
  }))

  return {
    tableOfContents: `### ${sectionName}\n\n` + generateTableOfContents(prefixed),
    reference: `### ${sectionName}\n\n` + prefixed.map(generateMarkdownForMethodDocumentation).join('\n'),
  }
}

function sortBySignatures(xs: MethodDocumentation[]) {
  const sorted = sortBy(xs, (d) => d.signature)

  // functions are lifted to the top
  const functions = sorted.filter((d) => d.signature.startsWith('function '))
  const others = sorted.filter((d) => !d.signature.startsWith('function '))

  return [...functions, ...others]
}

function prefixMethodSignature(prefix: string, signature: string) {
  if (signature.startsWith('function ')) return signature
  if (/^[(<]/.exec(signature)) return `function ${prefix}${signature}`
  return `${prefix}.${signature}`
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
