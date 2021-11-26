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
  const id = encodeAnchor(doc.abbreviatedSignature)
  const header = `\
<h4 id=${id}>
  <a href="#${id}">
    <code>${encodeHtml(doc.abbreviatedSignature)}</code>
  </a>
</h4>

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

${doc.examples.join('\n')}
  `

  return [header, params, examples].filter(Boolean).join('\n')
}

/**
 * @internal
 */
export function generateTableOfContents(docs: MethodDocumentation[]) {
  const links = docs.map(
    (d) => `\
<li>
  <a href="#${encodeAnchor(d.abbreviatedSignature)}">
    <code>${encodeHtml(d.signature)}</code>
  </a>
</li>
`,
  )

  return links.join('\n')
}

function encodeAnchor(input: string): string {
  return input
    .toLowerCase()
    .replace(/[(),:><]/g, '')
    .replace(/ /g, '-')
}

function encodeHtml(str: string) {
  return str.replace(/[><&]/g, (match) => {
    if (match === '>') return '&gt;'
    if (match === '<') return '&lt;'
    if (match === '&') return '&amp;'
    throw new Error('encodeHtml: Unexpected match')
  })
}
