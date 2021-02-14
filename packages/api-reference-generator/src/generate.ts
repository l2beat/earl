import { MethodDocumentation } from './types'

export function generateMarkdownForMethodDocumentation(doc: MethodDocumentation): string {
  return `#### ${doc.signature}

${doc.description}

*Parameters:*
${doc.params.map((p) => `- \`${p.name}\` - ${p.description}`).join('\n')}

*Examples:*
${doc.examples.join('\n')}`
}
