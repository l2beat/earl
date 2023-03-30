import { defineConfig } from 'vitepress'

const pkg = require('../../../earl/package.json')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'earl',
  description: 'Modern assertion library for TypeScript.',
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'earl' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Modern assertion library for TypeScript.',
      },
    ],
    ['meta', { property: 'og:image', content: 'https://earl.dev/social.png' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:title', content: 'earl' }],
    [
      'meta',
      {
        property: 'twitter:description',
        content: 'Modern assertion library for TypeScript.',
      },
    ],
    [
      'meta',
      { property: 'twitter:image', content: 'https://earl.dev/social.png' },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    editLink: {
      pattern:
        'https://github.com/l2beat/earl/edit/master/packages/website/docs/:path',
      text: 'Edit this page on GitHub',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/l2beat/earl' },
      { icon: 'twitter', link: 'https://twitter.com/l2beat' },
    ],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/introduction/why-earl' },
      {
        text: pkg.version,
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/l2beat/earl/blob/master/packages/earl/CHANGELOG.md',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/l2beat/earl/blob/master/CONTRIBUTING.md',
          },
        ],
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} L2BEAT`,
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Earl?', link: '/introduction/why-earl' },
          { text: 'Getting started', link: '/introduction/getting-started' },
          { text: 'Main concepts', link: '/introduction/main-concepts' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Basic assertions', link: '/guides/basic-assertions' },
          { text: 'Using matchers', link: '/guides/using-matchers' },
          { text: 'Handling errors', link: '/guides/handling-errors' },
          { text: 'Using mocks', link: '/guides/using-mocks' },
          { text: 'Snapshot testing', link: '/guides/snapshot-testing' },
          { text: 'Checking with Zod', link: '/guides/checking-with-zod' },
        ],
      },
      {
        text: 'API',
        items: [{ text: 'API Reference', link: '/api/api-reference' }],
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Extending Earl', link: '/advanced/extending-earl' },
          { text: 'Equality algorithm', link: '/advanced/equality-algorithm' },
        ],
      },
    ],

    algolia: {
      appId: 'QF2RRFVWZ5',
      apiKey: 'a338815904319796ea2e156c44ded361',
      indexName: 'earljs',
    },
  },
})
