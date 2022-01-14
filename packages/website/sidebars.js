/**
 * @see https://docusaurus.io/docs/next/sidebar
 * @type {import("@docusaurus/plugin-content-docs").SidebarsConfig}
 */
module.exports = {
  earlDocsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/getting-started',
        'introduction/step-by-step-guide',
        'introduction/core-concepts',
        'introduction/motivation',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/using-matchers',
        'guides/testing-errors',
        'guides/async-functions',
        'guides/mocks',
        'guides/using-plugins',
        'guides/test-runner-integration',
        'guides/snapshot-testing',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: ['api/api-reference'],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: ['advanced/plugin-development', 'advanced/equality-algorithm'],
    },
  ],
}
